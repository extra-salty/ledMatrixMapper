// int filter_len =  1000;
// uint32_t AN_Pot1_Buffer[1000] = {0};
// int AN_Pot1_i = 0;

  // pinMode(R_SPKR_EN,OUTPUT);
  // pinMode(L_SPKR_EN,OUTPUT);
  // digitalWrite(R_SPKR_EN,HIGH);
  // digitalWrite(L_SPKR_EN,HIGH);

  // analogSetWidth(11);
  // analogSetAttenuation(ADC_6db);
  // analogSetPinAttenuation(BAT_VOL_IN, ADC_11db);
  // Serial.println(ReadVoltage(BAT_VOL_IN),3);

// double ReadBatVol(){
//   int voltageDividerMultiplier = 11;
//   float offset = 0.16;

//   int batVolRaw = analogRead(BAT_VOL_IN);
//   if (batVolRaw < 1 || batVolRaw > 4095) return 0;
//   int batVolFilt = readADC_Avg(batVolRaw);
//   float batVol = (batVolFilt * 3.3 / 4095 + offset) * voltageDividerMultiplier; 
//   Serial.print("batVolt: ");
//   Serial.print(batVol);
//   Serial.println("");
// }

// uint32_t readADC_Avg(int ADC_Raw) {
//   uint32_t Sum = 0;

//   AN_Pot1_Buffer[AN_Pot1_i++] = ADC_Raw;
//   if (AN_Pot1_i == filter_len) AN_Pot1_i = 0;
//   for (int i = 0; i < filter_len; i++) Sum += AN_Pot1_Buffer[i];

//   return (Sum / filter_len);
// }