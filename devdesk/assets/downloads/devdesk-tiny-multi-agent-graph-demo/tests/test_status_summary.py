import unittest

from src.status_summary import format_progress


class FormatProgressTest(unittest.TestCase):
    def test_formats_plural_progress(self):
        self.assertEqual(format_progress(2, 3), "2/3 items complete")

    def test_formats_singular_progress(self):
        self.assertEqual(format_progress(1, 1), "1/1 item complete")

    def test_rejects_invalid_ranges(self):
        with self.assertRaises(ValueError):
            format_progress(2, 1)

    def test_rejects_boolean_values(self):
        with self.assertRaises(TypeError):
            format_progress(True, 1)


if __name__ == "__main__":
    unittest.main()
