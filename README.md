# flashcard-maker
flashcard maker using openAI api 

## basic chatgpt wrapper - base for later
in *gpt-basic-wrapper/main.py* i put simple python wrapper for OpenAI's ChatGPT API.

### Requirements
Ensure you have the following installed before running the script:
- Python 3.7+
- openai package
- python-dotenv package
### Setting up api key
in the *gpt-basic-wrapper/..* make .env file and add the following line:
```
OPEN_AI_KEY=your-api-key
```
ensure you ignore it in gitignore (it should alredy be like that, but pleas be *sure* about that)
```
echo ".env" >> .gitignore
```
### Usage
run the script with
```
python main.py
```

