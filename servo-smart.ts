/**
 * Servo Smart v0.2.2
 * Simple servo control for classroom projects.
 *
 * 360° continuous rotation servos
 * 180° position servos
 * Sensor trigger tools
 */

//% color=#D97706 icon="\uf021" block="Servo Smart" weight=85
namespace servoSmart {

    export enum SpinDirection {
        //% block="clockwise"
        Clockwise = 0,

        //% block="counterclockwise"
        Counterclockwise = 1
    }

    // Settings stored separately for each servo pin
    let neutral: number[] = []
    let turnMs: number[] = []
    let openAngle: number[] = []
    let closeAngle: number[] = []

    // Independent trigger states
    let previousCondition: boolean[] = []

    function getNeutral(pin: DigitalPin): number {
        return neutral[pin] === undefined ? 1500 : neutral[pin]
    }

    function getTurnMs(pin: DigitalPin): number {
        return turnMs[pin] === undefined ? 1000 : turnMs[pin]
    }

    function pulse(pin: DigitalPin, microseconds: number): void {
        pins.servoSetPulse(
            pin,
            Math.constrain(Math.round(microseconds), 500, 2500)
        )
    }

    // =====================================================
    // 360° CONTINUOUS
    // =====================================================

    /**
     * Spin a continuous rotation servo.
     */

    //% block="spin 360° servo at %pin %direction speed %speed"
    //% pin.defl=DigitalPin.P15
    //% speed.min=0 speed.max=100 speed.defl=50
    //% subcategory="360° Continuous" weight=100
    export function spin(
        pin: DigitalPin,
        direction: SpinDirection,
        speed: number
    ): void {

        const s = Math.constrain(speed, 0, 100)
        const delta = Math.round(s * 5)

        const offset =
            direction == SpinDirection.Clockwise
                ? -delta
                : delta

        pulse(pin, getNeutral(pin) + offset)
    }

    /**
     * Stop a continuous rotation servo.
     */

    //% block="stop 360° servo at %pin"
    //% pin.defl=DigitalPin.P15
    //% subcategory="360° Continuous" weight=90
    export function stop(pin: DigitalPin): void {
        pulse(pin, getNeutral(pin))
    }

    /**
     * Rotate for a selected time and speed.
     */

    //% block="rotate 360° %pin %direction for %seconds sec speed %speed"
    //% pin.defl=DigitalPin.P15
    //% seconds.min=0 seconds.max=60 seconds.defl=2
    //% speed.min=0 speed.max=100 speed.defl=50
    //% subcategory="360° Continuous" weight=80
    export function spinFor(
        pin: DigitalPin,
        direction: SpinDirection,
        seconds: number,
        speed: number
    ): void {

        if (seconds <= 0 || speed <= 0) {
            stop(pin)
            return
        }

        spin(pin, direction, speed)

        basic.pause(
            Math.round(
                Math.constrain(seconds, 0, 3600) * 1000
            )
        )

        stop(pin)
    }

    /**
     * Rotate approximately a selected number of turns.
     * Uses timing, not an encoder.
     */

    //% block="rotate 360° %pin %direction about %turns turns"
    //% pin.defl=DigitalPin.P15
    //% turns.min=0 turns.max=100 turns.defl=3
    //% subcategory="360° Continuous" weight=70
    export function rotateTurns(
        pin: DigitalPin,
        direction: SpinDirection,
        turns: number
    ): void {

        if (turns <= 0) {
            stop(pin)
            return
        }

        spin(pin, direction, 100)

        basic.pause(
            Math.round(
                Math.constrain(turns, 0, 1000) *
                getTurnMs(pin)
            )
        )

        stop(pin)
    }

    // =====================================================
    // 180° POSITION
    // =====================================================

    /**
     * Move a position servo to a selected angle.
     */

    //% block="move 180° servo at %pin to %angle degrees"
    //% pin.defl=AnalogPin.P16
    //% angle.min=0 angle.max=180 angle.defl=90
    //% subcategory="180° Position" weight=100
    export function moveTo(
        pin: AnalogPin,
        angle: number
    ): void {

        pins.servoWritePin(
            pin,
            Math.constrain(angle, 0, 180)
        )
    }

    /**
     * Configure opening and closing angles.
     */

    //% block="set 180° servo at %pin open angle %open close angle %close"
    //% pin.defl=AnalogPin.P16
    //% open.min=0 open.max=180 open.defl=90
    //% close.min=0 close.max=180 close.defl=0
    //% subcategory="180° Position" weight=90
    export function setDoorAngles(
        pin: AnalogPin,
        open: number,
        close: number
    ): void {

        openAngle[pin] = Math.constrain(open, 0, 180)
        closeAngle[pin] = Math.constrain(close, 0, 180)
    }

    /**
     * Open a servo-controlled mechanism.
     */

    //% block="open 180° servo at %pin"
    //% pin.defl=AnalogPin.P16
    //% subcategory="180° Position" weight=80
    export function open(pin: AnalogPin): void {

        moveTo(
            pin,
            openAngle[pin] === undefined
                ? 90
                : openAngle[pin]
        )
    }

    /**
     * Close a servo-controlled mechanism.
     */

    //% block="close 180° servo at %pin"
    //% pin.defl=AnalogPin.P16
    //% subcategory="180° Position" weight=70
    export function close(pin: AnalogPin): void {

        moveTo(
            pin,
            closeAngle[pin] === undefined
                ? 0
                : closeAngle[pin]
        )
    }

    // =====================================================
    // ADVANCED & TOOLS
    // =====================================================

    /**
     * Calibrate the stop pulse for a 360° servo.
     */

    //% block="set 360° servo at %pin stop pulse %microseconds µs"
    //% pin.defl=DigitalPin.P15
    //% microseconds.min=1300 microseconds.max=1700 microseconds.defl=1500
    //% subcategory="Advanced & Tools" weight=100
    export function setStopPulse(
        pin: DigitalPin,
        microseconds: number
    ): void {

        neutral[pin] =
            Math.constrain(microseconds, 1300, 1700)

        stop(pin)
    }

    /**
     * Calibrate the approximate time for one full turn.
     */

    //% block="set 360° servo at %pin one turn time %milliseconds ms"
    //% pin.defl=DigitalPin.P15
    //% milliseconds.min=100 milliseconds.max=10000 milliseconds.defl=1000
    //% subcategory="Advanced & Tools" weight=90
    export function setOneTurnTime(
        pin: DigitalPin,
        milliseconds: number
    ): void {

        turnMs[pin] =
            Math.constrain(milliseconds, 100, 10000)
    }

    /**
     * Trigger once when a condition changes from false to true.
     *
     * Each trigger number has independent state.
     * The condition must return to false before
     * the trigger can activate again.
     */

    //% block="trigger %triggerId once when %condition"
    //% triggerId.min=1 triggerId.max=20 triggerId.defl=1
    //% subcategory="Advanced & Tools" weight=80
    export function triggerOnce(
        triggerId: number,
        condition: boolean
    ): boolean {

        const index = Math.round(
            Math.constrain(triggerId, 1, 20)
        )

        const result =
            condition && !previousCondition[index]

        previousCondition[index] = condition

        return result
    }
}
