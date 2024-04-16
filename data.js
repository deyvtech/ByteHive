export const data = [
	{
		"user_id": 987,
		"username": "jsMaster123",
		"reputation": 10000,
		"badges": ["gold", "javascript", "jquery"],
		"questions": [
			{
				"question_id": 123456,
				"title": "How to sort a list of objects in JavaScript?",
				"body": "I have a list of objects in JavaScript and I want to sort them based on a specific property. How can I achieve this?",
				"tags": ["javascript", "arrays", "sorting"],
				"answers": [
					{
						"answer_id": 654321,
						"body": "You can use the `sort` function along with a custom comparator. Here's an example...",
						"score": 50
					}
				],
				"comments": [
					{
						"comment_id": 789123,
						"body": "Have you tried using the `sort` function?",
						"score": 10
					}
				]
			}
		],
		"bookmarks": [
			{
				"bookmark_id": 987654,
				"question_id": 123456
			}
		],
		"flagged_posts": [
			{
				"flag_id": 987654,
				"post_id": 123456,
				"reason": "Spam"
			}
		]
	},
	{
		"user_id": 654,
		"username": "pythonWizard456",
		"reputation": 8000,
		"badges": ["silver", "python", "django"],
		"questions": [
			{
				"question_id": 789012,
				"title": "How to handle exceptions in Python?",
				"body": "I'm new to Python and I want to understand how to handle exceptions properly. Can someone explain?",
				"tags": ["python", "exception-handling"],
				"answers": [
					{
						"answer_id": 123789,
						"body": "In Python, you can use the `try-except` block to handle exceptions. Here's an example...",
						"score": 30
					}
				],
				"comments": [
					{
						"comment_id": 456789,
						"body": "You can check the Python documentation for more details on exception handling.",
						"score": 5
					}
				]
			}
		],
		"bookmarks": [
			{
				"bookmark_id": 654321,
				"question_id": 789012
			}
		],
		"flagged_posts": []
	}
]
