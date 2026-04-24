from __future__ import annotations

import sqlite3
from pathlib import Path
from typing import Any

DB_FILE = "movies.db"


def connect(db_path: str | Path = DB_FILE) -> sqlite3.Connection:
    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    return conn


def init_db(conn: sqlite3.Connection) -> None:
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            year INTEGER,
            url TEXT NOT NULL,
            source TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            UNIQUE(title, url)
        );
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_movies_title ON movies(title);")
    conn.commit()


def upsert_movies(conn: sqlite3.Connection, movies: list[dict[str, Any]], source: str) -> int:
    inserted = 0
    for item in movies:
        cur = conn.execute(
            """
            INSERT OR IGNORE INTO movies(title, year, url, source)
            VALUES (?, ?, ?, ?)
            """,
            (item["title"], item.get("year"), item["url"], source),
        )
        inserted += cur.rowcount
    conn.commit()
    return inserted


def search_movies(conn: sqlite3.Connection, query: str, limit: int = 10) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT title, year, url
        FROM movies
        WHERE title LIKE ?
        ORDER BY
            CASE WHEN lower(title) = lower(?) THEN 0 ELSE 1 END,
            title ASC
        LIMIT ?
        """,
        (f"%{query.strip()}%", query.strip(), limit),
    ).fetchall()
    return [dict(r) for r in rows]


def count_movies(conn: sqlite3.Connection) -> int:
    row = conn.execute("SELECT COUNT(*) AS c FROM movies").fetchone()
    return int(row["c"])
