# pxt-ucl-junkrobot
A PXT package for University College London made junk-robot

Package is meant to work with:
* 28BYJ-48 Stepper motors
* HC-SR04 Ultrasonic sensors

###### Pin connections for stepper motors and ultrasonic sensors
* Left Motor
  * micro:bit pin - ULN2003 driver
  * PIN 1 - IN1
  * PIN 7 - IN2
  * PIN 6 - IN3
  * PIN 0 - IN4


* Right Motor
  * micro:bit pin - ULN2003 driver
  * PIN 2 - IN1
  * PIN 13 - IN2
  * PIN 14 - IN3
  * PIN 15 - IN4


* Front Ultrasonic Sensor
  * micro:bit pin - HC-SR04 pins
  * Pin 8 - Trigger
  * Pin 9 - Echo


* Side Ultrasonic Sensor
  * micro:bit pin - HC-SR04 pins
  * PIN 12 - Trigger
  * PIN 6 - Echo

##### Note
Use a separate battery pack  to power the motors and sensors
*
*four AA battery pack will suffice*

*Also please use a common GND when connecting the electronic circuit*


## Supported targets

* for PXT/microbit

## License
MIT
