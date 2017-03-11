// tests go here; this will not be compiled when this package is used as a library
{
    let right_motor: junkrobot.Motor = junkrobot.createMotor(
        DigitalPin.P1,
        DigitalPin.P7,
        DigitalPin.P6,
        DigitalPin.P0
    )
    let left_motor: junkrobot.Motor = junkrobot.createMotor(
        DigitalPin.P2,
        DigitalPin.P13,
        DigitalPin.P14,
        DigitalPin.P15
    )
    let frontThreshold = 10
    let robot: junkrobot.Robot = junkrobot.createRobot(left_motor, right_motor)
    left_motor.setCalibration(35)
    for (let i = 0; i < 2; i++) {
        robot.moveForward(552, DistUnit.Steps)
        basic.pause(300)
        robot.moveBackward(2, DistUnit.Centimeters)
        basic.pause(300)
        robot.turnLeft()
        basic.pause(300)
        robot.turnRight()
        basic.pause(300)
        robot.turnRight_steps(2)
        basic.pause(300)
        robot.turnLeft_steps(4)
        basic.pause(300)
        robot.turn(45)
        basic.pause(300)
        robot.turn(-45)
    }
    while (true) {
        let front_sensor = junkrobot.sensor(
            DigitalPin.P8,
            DigitalPin.P9,
            PingUnit.Centimeters
        )
        if (front_sensor < frontThreshold) {
            robot.moveBackward(1, DistUnit.Centimeters)
        } else {
            robot.moveForward(1, DistUnit.Centimeters)
        }
    }

}
