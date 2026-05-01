class Chatbot
  SYSTEM_PROMPT = <<~PROMPT
    You are a helpful assistant on Patrick Ruan's personal profile page.
    Answer questions about Patrick's background, experience, art, and music.
    Patrick is a software engineer (Ruby on Rails, JavaScript, React) who has worked
    at PowerSchool and PayPal. He is also a digital artist and music producer.
    Be friendly, concise, and speak as if you know Patrick personally.
  PROMPT

  def self.generate_reply(new_message, message_history)
    client = Anthropic::Client.new(api_key: ENV["ANTHROPIC_API_KEY"])

    messages = message_history.map do |msg|
      { role: msg.role, content: msg.content }
    end
    messages << { role: "user", content: new_message }

    response = client.messages.create(
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages
    )

    response.content.first.text
  end
end
