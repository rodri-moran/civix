package com.example.inventory_service.configs;

import org.springframework.context.annotation.Configuration;

@Configuration
public class WebClientConfig {
//    @Bean
//    public WebClient.Builder webClientBuilder() {
//        HttpClient httpClient = HttpClient.create()
//                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000)
//                .responseTimeout(Duration.ofSeconds(10))
//                .doOnConnected(conn ->
//                    conn.addHandlerLast(new ReadTimeoutHandler(10, TimeUnit.SECONDS))
//                        .addHandlerLast(new WriteTimeoutHandler(10, TimeUnit.SECONDS)));
//
//        return WebClient.builder()
//                .clientConnector(new ReactorClientHttpConnector(httpClient));
//    }
}
