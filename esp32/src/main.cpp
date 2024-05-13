#include <Arduino.h>
#include <FastLED.h>
// #include <WebSerial.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <DNSServer.h>
#include <ESPmDNS.h>

// Pins
#define ONBOARD_LED 2
#define BAT_VOL_IN 35 // ADC1_7 - GPIO35
#define R_SPKR_IN 32  // ADC1_4 - GPIO32 - XTAL32 - TOUCH9
#define L_SPKR_IN 33  // ADC1_5 - GPIO33 - XTAL32 - TOUCH8
#define R_SPKR_EN 25  // ADC2_8 - GPIO25 - DAC1
#define L_SPKR_EN 26  // ADC2_9 - GPIO26 - DAC2
#define DATA_PIN 27   // ADC2_7 - GPIO27 - TOUCH7

// FastLED
#define NUM_LEDS 276
CRGB leds[NUM_LEDS];

// Server
AsyncWebServer server(80);
DNSServer dnsServer;
// AsyncWebSocket ws("/ws");
IPAddress apIP(192, 168, 1, 1);
IPAddress Mask(255, 255, 255, 0);
const byte DNS_PORT = 53;
const char *wifi_network_ssid = "vibe_sta";
const char *soft_ap_ssid = "vibe_ap";
const char *password = "password123"; // min 8 character

IPAddress local_IP(192, 168, 1, 100);
IPAddress gateway(192, 168, 1, 10);
IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(208, 67, 222, 222);
IPAddress secondaryDNS(208, 67, 220, 220);

void OnWiFiEvent(WiFiEvent_t event)
{
  switch (event)
  {
  case SYSTEM_EVENT_WIFI_READY:
    Serial.println("WIFI initialized");
    break;
  case SYSTEM_EVENT_STA_START:
    Serial.println("ESP32 station start");
    break;
  case SYSTEM_EVENT_STA_STOP:
    Serial.println("ESP32 station stop");
    break;
  case SYSTEM_EVENT_STA_CONNECTED:
    Serial.print("ESP32 station connected to AP with: ");
    Serial.println(WiFi.localIP());
    break;
  case SYSTEM_EVENT_STA_DISCONNECTED:
    Serial.print(".");
    break;
  case SYSTEM_EVENT_AP_START:
    Serial.print("ESP32 soft-AP start with: ");
    Serial.println(WiFi.softAPIP());
    break;
  case SYSTEM_EVENT_AP_STOP:
    Serial.println("ESP32 soft-AP stop");
    break;
  case SYSTEM_EVENT_AP_STACONNECTED:
    Serial.println("Station connected to ESP32 soft AP");
    break;
  case SYSTEM_EVENT_AP_STADISCONNECTED:
    Serial.println("Station disconnected from ESP32 soft AP");
    break;
  default:
    break;
  }
}

void setup()
{
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
            {
   if (ON_STA_FILTER(request)) {
      request->send(200, "text/plain", "Hello from STA");
      return;
   } else if (ON_AP_FILTER(request)) {
      request->send(200, "text/plain", "Hello from AP");
      return;
   }
   request->send(200, "text/plain", "Hello from undefined"); });

  Serial.begin(115200);
  // //  pinMode(ONBOARD_LED,OUTPUT);
  // //  pinMode(LEDS_PIN,  OUTPUT);

  // Server setup
  WiFi.onEvent(OnWiFiEvent);
  WiFi.mode(WIFI_MODE_APSTA);
  WiFi.hostname("Vibe");
  WiFi.softAPConfig(apIP, apIP, Mask);
  WiFi.softAP(soft_ap_ssid, password);
  WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS);
  WiFi.begin(wifi_network_ssid, password);
  delay(100);

  Serial.print("ESP32 IP on the WiFi network: ");
  Serial.println(WiFi.localIP());
  Serial.print("ESP32 IP as soft AP: ");
  Serial.println(WiFi.softAPIP());

  dnsServer.start(DNS_PORT, "vibe", apIP);
  server.begin();

  // FastLED setup
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
}

void loop()
{
  fill_solid(leds, NUM_LEDS, CHSV(0, 255, 255));
  FastLED.show();
  // dnsServer.processNextRequest();
  // for (int i = 0; i <= 255; i++)
  // {
  //   fill_solid(leds, NUM_LEDS, CHSV(i, 255, 255));
  //   FastLED.show();
  //   delay(1);
  //   // delay(500);
  //   // fill_solid(leds, NUM_LEDS, CHSV(100, 255, 0));
  //   // FastLED.show();
  //   // delay(500);
  // }
}
