package org.rowan;

import dev.langchain4j.model.openai.OpenAiChatModel;
import org.bsc.langgraph4j.state.AgentState;

public class Main {
    public static void main(String[] args) {
        // 初始化LLM
        var model = OpenAiChatModel.builder()
                .apiKey(System.getenv("OPENAI_API_KEY"))
                .modelName("gpt-4o")
                .build();



    }
}