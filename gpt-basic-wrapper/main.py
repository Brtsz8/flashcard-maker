import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

#loads env that has api key 
_ = load_dotenv(find_dotenv())

#loads api key
client = OpenAI(
    api_key=os.environ.get('OPEN_AI_KEY')
)

model = "gpt-4o"
#prompts
prompt = input("Enter prompt: ")

response = client.responses.create(
    model = model,
    input = prompt
)

print(response.output_text)