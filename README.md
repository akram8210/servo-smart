# Servo Smart

Easy 180° and 360° servo control for BBC micro:bit MakeCode.

**Version:** 0.2.2 (Beta)

Designed for students, teachers, and classroom technology projects.

## Features

### 360° Continuous Servo
- Spin clockwise or counterclockwise.
- Control rotation speed (0–100%).
- Stop the servo.
- Rotate for a specified time.
- Rotate approximately a specified number of turns.

### 180° Position Servo
- Move to a specific angle (0–180°).
- Configure opening and closing angles.
- Open and close with simple blocks.

### Advanced & Tools
- Calibrate the 360° servo stop pulse.
- Calibrate approximate time per revolution.
- Detect when a condition becomes true.

## Installation

1. Open https://makecode.microbit.org/
2. Create a new project.
3. Open **Extensions**.
4. Search for:

   https://github.com/akram8210/servo-smart

5. Select **Servo Smart**.

## Wiring

| Servo wire | Connection |
|---|---|
| Signal | micro:bit pin (for example, P15 or P16) |
| VCC | Suitable servo power supply |
| GND | Common ground with micro:bit |

**Important:** Use an external power supply when required by the servo's current demand. Connect the external supply ground to the micro:bit ground. Do not connect a servo power supply directly to a micro:bit signal pin.

## Notes

- A 360° continuous servo controls rotation direction and speed, not absolute angle.
- The number of turns is approximate and depends on servo calibration, voltage, and mechanical load.
- A 180° servo controls position.
- Trigger blocks detect a change from false to true and must be evaluated repeatedly.

## Compatibility

- BBC micro:bit
- Microsoft MakeCode
- 180° positional servos
- 360° continuous rotation servos

## License

MIT License.
