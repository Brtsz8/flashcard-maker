import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import json

def analyse_text(client, user_prompt):
    tools = [{
        "type": "function",
        "function": {
            "name": "json_maker",
            "description": "Generates flashcards based on input text",
            "parameters": {
                "type": "object",
                "properties": {
                    "flashcards": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "question": {"type": "string"},
                                "solution": {"type": "string"}
                            },
                            "required": ["question", "solution"]
                        }
                    }
                },
                "required": ["flashcards"]
            }
        }
    }]

    prompt = f"""
    {user_prompt}
    Based on the above content, generate flashcards as JSON.
    Each item should include a "question" and "solution".
    """

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": prompt}
        ],
        tools=tools,
        tool_choice={"type": "function", "function": {"name": "json_maker"}}
    )

    tool_call = response.choices[0].message.tool_calls[0]
    function_args = json.loads(tool_call.function.arguments)

    return function_args["flashcards"]

# Załaduj .env z kluczem OPEN_AI_KEY
_ = load_dotenv(find_dotenv())

# Utwórz klienta
client = OpenAI(
    api_key=os.environ.get("OPEN_AI_KEY")
)
user_prompt = input("Enter prompt: ")

print(analyse_text(client,user_prompt))