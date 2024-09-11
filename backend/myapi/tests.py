from django.test import TestCase
from django.urls import reverse
from django.http import JsonResponse

class ApiTestCase(TestCase):
    
    def test_candlestick_data(self):
        """
        Test the candlestick_data endpoint to ensure functioning endpoints 
        """
        url = reverse('candlestick-data') 
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        
        expected_data = {"data": [
    { "date": "2023-08-10", "open": 440, "high": 452, "low": 438, "close": 450 },
    { "date": "2023-08-11", "open": 450, "high": 460, "low": 445, "close": 455 },
    { "date": "2023-08-14", "open": 455, "high": 465, "low": 450, "close": 460 },
    { "date": "2023-08-15", "open": 460, "high": 470, "low": 458, "close": 465 },
    { "date": "2023-08-16", "open": 465, "high": 475, "low": 460, "close": 470 },
    { "date": "2023-08-17", "open": 470, "high": 480, "low": 465, "close": 475 },
    { "date": "2023-08-18", "open": 475, "high": 475, "low": 465, "close": 467 },
    { "date": "2023-08-21", "open": 480, "high": 490, "low": 475, "close": 485 },
    { "date": "2023-08-22", "open": 485, "high": 495, "low": 480, "close": 490 },
    { "date": "2023-08-23", "open": 490, "high": 500, "low": 485, "close": 495 },
    { "date": "2023-08-24", "open": 495, "high": 505, "low": 490, "close": 500 },
    { "date": "2023-08-25", "open": 500, "high": 510, "low": 495, "close": 505 },
    { "date": "2023-08-28", "open": 505, "high": 515, "low": 500, "close": 510 },
    { "date": "2023-08-29", "open": 510, "high": 520, "low": 505, "close": 515 },
    { "date": "2023-08-30", "open": 505, "high": 515, "low": 501, "close": 501 },
    { "date": "2023-08-31", "open": 520, "high": 530, "low": 515, "close": 525 },
    { "date": "2023-09-01", "open": 525, "high": 535, "low": 520, "close": 530 },
    { "date": "2023-09-05", "open": 530, "high": 540, "low": 525, "close": 525 },
    { "date": "2023-09-06", "open": 535, "high": 545, "low": 530, "close": 540 },
    { "date": "2023-09-07", "open": 540, "high": 550, "low": 535, "close": 545 },
    { "date": "2023-09-08", "open": 545, "high": 555, "low": 540, "close": 550 },
    { "date": "2023-09-11", "open": 550, "high": 560, "low": 545, "close": 555 },
    { "date": "2023-09-12", "open": 555, "high": 565, "low": 550, "close": 552 },
    { "date": "2023-09-13", "open": 560, "high": 570, "low": 555, "close": 565 },
    { "date": "2023-09-14", "open": 565, "high": 575, "low": 560, "close": 570 },
    { "date": "2023-09-15", "open": 580, "high": 583, "low": 565, "close": 575 },
    { "date": "2023-09-18", "open": 575, "high": 585, "low": 570, "close": 580 },
    { "date": "2023-09-19", "open": 580, "high": 590, "low": 575, "close": 585 },
    { "date": "2023-09-20", "open": 585, "high": 595, "low": 580, "close": 590 },
    { "date": "2023-09-21", "open": 590, "high": 600, "low": 585, "close": 595 }
  ]
}

        
        self.assertJSONEqual(str(response.content, encoding='utf8'), expected_data)

    def test_line_chart_data(self):
        """
        Test the line_chart_data endpoint to ensure functioning endpoints 
        """
        url = reverse('line-chart-data')  
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        expected_data = {
            "labels": ["Jan", "Feb", "Mar", "Apr"],
            "data": [10, 20, 30, 40]
        }
        self.assertJSONEqual(str(response.content, encoding='utf8'), expected_data)

    def test_bar_chart_data(self):
        """
        Test the bar_chart_data endpoint to ensure functioning endpoints 
        """
        url = reverse('bar-chart-data')  
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        expected_data = {
            "labels": ["Product A", "Product B", "Product C"],
            "data": [100, 150, 200]
        }
        self.assertJSONEqual(str(response.content, encoding='utf8'), expected_data)

    def test_pie_chart_data(self):
        """
        Test the pie_chart_data endpoint to ensure functioning endpoints 
        """
        url = reverse('pie-chart-data') 
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        expected_data = {
            "labels": ["Red", "Blue", "Yellow"],
            "data": [300, 50, 100]
        }
        self.assertJSONEqual(str(response.content, encoding='utf8'), expected_data)
