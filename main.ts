enum PingUnit {
//% block="cm"
Centimeters,
//% block="μs"
MicroSeconds
}

enum DistUnit {
//% block="steps"
Steps,
//% block="cm"
Centimeters
}

/**
 * UCL junk robot prototype code using 28BYJ-48 stepper motors
 */
//% weight=100
namespace junkrobot {

    export class Motor {

        private input1: DigitalPin;
        private input2: DigitalPin;
        private input3: DigitalPin;
        private input4: DigitalPin;
        private calibration: number;
        private state: number;

        setPins(in1: DigitalPin, in2: DigitalPin, in3: DigitalPin, in4: DigitalPin): void {
            // send pulse
            this.input1 = in1;
            this.input2 = in2;
            this.input3 = in3;
            this.input4 = in4;
        }

        //% blockId=set_motor_calibration block="%motor|set turning calibration value %calibration" blockGap=8
        //% advanced=true
        setCalibration(calibration: number): void {
            this.calibration = calibration;
        }

        getCalibration(): number {
            return this.calibration;
        }

        setState(stateNum: number): void {
            this.state = stateNum;
        }

        steps(direction: number): void {
            if (this.state == 0) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 1);
            } else if (this.state == 1) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 1);
                pins.digitalWritePin(this.input4, 1);
            } else if (this.state == 2) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 1);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 3) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 1);
                pins.digitalWritePin(this.input3, 1);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 4) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 1);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 5) {
                pins.digitalWritePin(this.input1, 1);
                pins.digitalWritePin(this.input2, 1);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 6) {
                pins.digitalWritePin(this.input1, 1);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 7) {
                pins.digitalWritePin(this.input1, 1);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 1);
            }

            this.state = this.state + direction;
            if (this.state < 0) {
                this.state = 7;
            } else if (this.state > 7) {
                this.state = 0;
            }
        }

    }

    export class Robot {
        private motorL: Motor;
        private motorR: Motor;

        setMotors(motorL: Motor, motorR: Motor): void {
            this.motorL = motorL;
            this.motorR = motorR;
        }

        //% blockId=move_forward block="%this|move %steps|%unit| forward"
        //% weight=81
        moveForward(steps: number, unit: DistUnit): void {
            switch (unit) {
                case DistUnit.Centimeters: steps = steps * 273; //273 steps = 1cm
                case DistUnit.Steps: steps = steps ;
            }

            for (let i = 0; i < steps; i++) {
                this.motorL.steps(-1);
                this.motorR.steps(1);
                basic.pause(1);
            }
        }

        //% blockId=move_backward block="%this|move %steps|%unit| backward"
        //% weight=80
        moveBackward(steps: number, unit: DistUnit): void {
            switch (unit) {
                case DistUnit.Centimeters: steps = steps * 273; //273 steps = 1cm
                case DistUnit.Steps: steps = steps ;
            }

            for (let i = 0; i < steps; i++) {
                this.motorL.steps(1);
                this.motorR.steps(-1);
                basic.pause(1);
            }
        }

        //% blockId=turn_left block="%this| turnLeft()"
        //% weight=71
        turnLeft(): void {
            for (let i = 0; i < 90 * (this.motorL.getCalibration()); i++) {
                this.motorL.steps(1);
                this.motorR.steps(1);
                basic.pause(1);
            }
        }

        //% blockId=turn_right block="%this| turnRight()"
        //% weight=70
        turnRight(): void {
            for (let i = 0; i < 90 * (this.motorL.getCalibration()); i++) {
                this.motorL.steps(-1);
                this.motorR.steps(-1);
                basic.pause(1);
            }
        }

        //% blockId=turn_right_error block="%this| turnRight()| with %error| steps calibration"
        //% advanced=true
        turnRight_steps(error: number): void {
            for (let i = 0; i < ( (90 * this.motorL.getCalibration()) - error ); i++) {
                this.motorL.steps(-1);
                this.motorR.steps(-1);
                basic.pause(1);
            }
        }

        //% blockId=turn_left_error block="%this| turnLeft()|with %error| steps calibration"
        //% advanced=true
        turnLeft_steps(error: number): void {
            for (let i = 0; i < ( (90 * this.motorL.getCalibration()) - error ); i++) {
                this.motorL.steps(1);
                this.motorR.steps(1);
                basic.pause(1);
            }
        }


        //% blockId=turn_n_degrees block="%robot|turn %angle|degrees"
        //% advanced=true
        turn(angle: number): void {
            let direction: number;
          //  var ticks: number = 34.249;
            console.log("Turning : " + angle);
            if (angle > 0) {
                direction = -1;
            }
            else if (angle < 0) {
                direction = 1;
                angle = (0-angle);
            }
            else if (angle == 0) {
                direction = 0;
            }

            // console.log("new nTicks value: " + angle);
            if (direction != 0) {
                //var nTicks: number;
                //nTicks = angle * ticks;
                //console.log("nTicks value: " + nTicks);
                for (let i = 0; i < (angle* this.motorL.getCalibration()); i++) {
                    this.motorL.steps(direction);
                    this.motorR.steps(direction);
                    basic.pause(1);
                }
            }
        }

    }

    //% blockId=create_moto block="set pin1 %input1|set pin2 %input2|set pin3 %input3|set pin4 %input4"
    //% weight=99
    export function createMotor(input1: DigitalPin, input2: DigitalPin, input3: DigitalPin, input4: DigitalPin)
        : Motor {
        let motor = new Motor();
        motor.setPins(input1, input2, input3, input4);
        motor.setCalibration(32); //standard calibration set to 32
        motor.setState(1);
        return motor;
    }

    //% blockId=create_robot block="set left motor %motor1|set right motor %motorR"
    //% weight=100
    export function createRobot(motorL: Motor, motorR: Motor): Robot {
        let robot = new Robot();
        robot.setMotors(motorL, motorR);
        return robot;
    }



    //% blockId=ultrasonic_sensor block="sensor trig %trig|echo %echo|unit %unit"
    //% weight=95
    export function sensor(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        let d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 42);
        console.log("Distance: " + d/42);

        switch (unit) {
            case PingUnit.Centimeters: return d / 42;
            default: return d ;
        }
    }
}
