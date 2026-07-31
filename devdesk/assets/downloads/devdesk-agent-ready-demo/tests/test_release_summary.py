import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1] / "src"))

from release_summary import build_release_summary, count_open_items, normalize_title


class ReleaseSummaryTests(unittest.TestCase):
    def test_normalizes_extra_spaces(self):
        self.assertEqual(normalize_title("  July   release  "), "July release")

    def test_counts_only_open_items(self):
        items = [{"done": False}, {"done": True}, {"done": None}, {}]
        self.assertEqual(count_open_items(items), 3)

    def test_builds_a_local_summary(self):
        items = [{"done": True}, {"done": False}]
        self.assertEqual(build_release_summary(" July release ", items), "July release: 2 items, 1 open")


if __name__ == "__main__":
    unittest.main()
