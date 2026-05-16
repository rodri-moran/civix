package com.example.user_service.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .authorizeHttpRequests(auth -> auth

                        // Público: solo registro
                        .requestMatchers(HttpMethod.POST, "/api/users/public/register").permitAll()

                        // Interno: usado por auth-service para login/register
                        .requestMatchers("/api/users/internal/auth/**").permitAll()

                        // Endpoints admin
                        .requestMatchers("/api/users/admin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/users/admin").hasRole("ADMIN")

                        // Perfil propio
                        .requestMatchers(HttpMethod.GET, "/api/users/me").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/users/me").authenticated()

                        // Otros internos
                        .requestMatchers("/api/users/internal/**").authenticated()

                        // Todo lo demás requiere token
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}