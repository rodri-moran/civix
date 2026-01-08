package com.example.report_service.configs;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
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
                        .requestMatchers("/api/report/get-by-user-id").authenticated()

                        .requestMatchers("/api/report/public/**").permitAll()

                        .requestMatchers("/api/report/admin/**").hasRole("ADMIN")

                        .requestMatchers("/api/new/admin/**","/api/new/admin").hasRole("ADMIN")

                        .requestMatchers("/api/report/status/**").hasAnyRole("ADMIN", "CUADRILLA")

                        .requestMatchers("/api/squad/reports/**").hasRole("CUADRILLA")

                        .requestMatchers("/api/report/**").hasAnyRole("USER", "ADMIN")



                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}