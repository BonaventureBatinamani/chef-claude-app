
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.


export async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    const apiKey = process.env.REACT_APP_ANTHROPIC_KEY;

    try{
        const response = await fetch("https://anthropic.com",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
                "dangerously-allow-html-user-transmissions": "true"
            },
            body: JSON.stringify({
                model: "claude-3-haiku-20240307",
                max_tokens: 1024,
                system: SYSTEM_PROMPT,
                messages: [
                    { role: "user", 
                      content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` 
                    },
                ],
            })
        });

        if (!response.ok){
            throw new Error(`Anthropic API error: ${response.statusText}`); 
        }

        const data = await response.json()
        return data.content[0].text;
    }catch (err){
        console.error("Claude Error:", err.message);
        return "Sorry, I couldn't reach Chef Claude right now.";
    }

}

// Make sure you set an environment variable in Scrimba 
// for HF_ACCESS_TOKEN

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    const apiKey = process.env.REACT_APP_HF_API_KEY;
    try {
        const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "meta-llama/Llama-3.1-8B-Instruct:fastest",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: `I have ${ingredientsString}. Please give me a recipe!` },
                ],
                max_tokens: 1024,
            })

        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error("HF API error details:", errorBody);
            throw new Error(`Hugging Face API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (err) {
        console.error(err.message)
        return "Sorry, I couldn't reach the Mistral AI model right now.";
    }
}
