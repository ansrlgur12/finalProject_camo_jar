package com.example.demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class CampApp {
    public static void main(String[] args) {
        // API 호출에 필요한 정보 설정
        String apiKey = "q%2FN6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg%3D%3D";
        String apiUrl = "http://apis.data.go.kr/B551011/GoCamping/basedList?";

        // API 요청 파라미터 설정 (예시: 캠핑장 정보 검색)
        String params = "&numOfRows=3507&MobileOS=ETC&MobileApp=AppTest&_type=json";
        String apiUrlWithParams = apiUrl +  "serviceKey=" + apiKey + params;

        // HttpClient 객체 생성
        HttpClient httpClient = HttpClient.newHttpClient();

        // HttpRequest 객체 생성
        HttpRequest request;
        try {
            request = HttpRequest.newBuilder()
                    .uri(new URI(apiUrlWithParams))
                    .GET()
                    .build();

            // API 호출 및 응답 처리
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            int statusCode = response.statusCode();

            if (statusCode == 200) { // 성공적인 응답을 받은 경우
                String responseBody = response.body();
                // 응답 데이터 처리
                System.out.println(responseBody);

            } else {
                System.out.println("API 호출 실패. 상태 코드: " + statusCode);
            }
        } catch (URISyntaxException | IOException | InterruptedException e) {
            System.out.println("API 호출 중 오류 발생: " + e.getMessage());
        }
    }
}
