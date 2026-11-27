import { p } from "../dsl.mjs";
import { transistors, diodes, capacitors, packages, resistors } from "../legacy.mjs";

const switches = p("pb-switches", "Name a type of switch", `
10 Toggle switch | toggle
10 Push button | pushbutton | push button switch | momentary switch | tactile switch | tact switch
10 Slide switch | slide
10 Rocker switch | rocker
15 DIP switch | dip
15 Rotary switch | rotary
15 Limit switch | microswitch | micro switch | snap action switch
15 Reed switch | reed
30 Relay | electromechanical relay
30 Membrane switch | membrane keypad
30 Capacitive touch switch | touch switch | capacitive switch
30 Key switch | keylock switch | keyswitch
30 Float switch | float
30 Pressure switch
30 Thermostat | bimetallic switch | thermal switch
60 Mercury switch | mercury tilt switch | tilt switch
60 Centrifugal switch
60 Dead man's switch | deadman switch | dead mans switch
60 Hall effect switch | hall switch
60 Solid-state relay | ssr
60 Footswitch | foot switch | foot pedal switch
60 Knife switch | knife
60 Three-way switch | 3-way switch | three way
85 Four-way switch | 4-way switch
85 Thumbwheel switch | thumbwheel
85 Crossbar switch | crossbar
85 Stepping switch | strowger switch | uniselector
85 Reed relay
100 Vacuum interrupter | vacuum switch
`);

const connectors = p("pb-connectors", "Name an electrical connector", `
10 USB-C | usb type c | type c
10 Barrel jack | dc barrel jack | barrel connector | dc jack
10 Banana plug | banana
15 USB-A | usb type a
15 Micro-USB | micro usb
15 JST | jst connector | jst-ph | jst-xh
15 Dupont | dupont connector
15 Pin header | header | 0.1 inch header
15 Terminal block | screw terminal | euroblock
15 Alligator clip | crocodile clip | gator clip
30 Molex | molex connector
30 D-sub | db9 | db25 | de-9 | d subminiature
30 RJ45 | 8p8c | ethernet jack
30 RJ11 | phone jack
30 XT60 | xt30 | xt90
30 Anderson Powerpole | powerpole | anderson
30 IDC | insulation displacement connector | ribbon connector
30 Spade connector | spade terminal | quick disconnect | faston
30 Ring terminal | ring lug | lug
30 Edge connector | card edge | gold fingers
60 FFC/FPC connector | ffc | fpc | zif connector | zero insertion force
60 Wago lever nut | wago | lever nut
60 Deutsch connector | deutsch | dt connector
60 M12 connector | m12 | m8
60 Mil-spec circular | mil-spec | mil-dtl-38999 | 38999 | circular connector
60 Pogo pin | spring pin | pogo
60 Mini-Fit Jr | mini fit | minifit
60 Phoenix contact | phoenix
60 Speakon | speakon connector
85 Harwin Gecko | gecko
85 Hirose DF13 | df13 | hirose
85 Micro-Match | micro match
85 Wire-wrap post | wire wrap
100 Fahnestock clip | fahnestock
`);

const sensors = p("pb-sensors", "Name a type of sensor", `
10 Temperature sensor | thermometer
10 Light sensor | photodetector
10 Motion sensor | pir | pir sensor | passive infrared
15 Accelerometer
15 Gyroscope | gyro
15 Ultrasonic sensor | ultrasonic | sonar
15 Humidity sensor | hygrometer
15 Pressure sensor | barometer | barometric
15 Microphone | mic
15 Hall effect sensor | hall sensor
30 Magnetometer | compass
30 Load cell | strain gauge
30 Thermocouple
30 Current sensor | current transformer
30 Proximity sensor | inductive proximity sensor | capacitive proximity sensor
30 Encoder | rotary encoder | optical encoder
30 Gas sensor | smoke detector | co2 sensor
30 Infrared sensor | ir sensor
30 Image sensor | camera | cmos sensor | ccd
60 Lidar
60 Time-of-flight sensor | tof sensor | tof
60 Flow sensor | flow meter
60 Piezoelectric sensor | piezo sensor
60 Geiger counter | geiger muller tube | radiation sensor
60 Resolver
60 LVDT | linear variable differential transformer
60 pH sensor | ph probe
60 Capacitive touch sensor | touch sensor
85 Bolometer | microbolometer
85 Fluxgate sensor | fluxgate
85 SQUID | superconducting quantum interference device
85 Photomultiplier tube | pmt | photomultiplier
85 Tachometer | tacho
100 Hydrophone
`);

const displays = p("pb-displays", "Name a display technology", `
10 LCD | liquid crystal display
10 LED display | led
10 OLED
15 Seven-segment display | 7 segment | seven segment
15 CRT | cathode ray tube
15 E-ink | e-paper | electronic paper | eink | epaper
15 Plasma display | plasma
15 Touchscreen | touch screen
30 Dot matrix | led matrix
30 MicroLED | micro led
30 QLED | quantum dot display | quantum dot
30 TFT | tft lcd
30 AMOLED
30 Nixie tube | nixie
30 VFD | vacuum fluorescent display
30 Projector | dlp | digital light processing
60 IPS | in-plane switching
60 Electroluminescent display | el display | electroluminescent
60 Split-flap display | split flap | solari board
60 Flip-dot display | flip dot | flip disc
60 LCoS | liquid crystal on silicon
60 Sixteen-segment display | 16 segment | starburst display
60 LED bar graph | bar graph | light bar
60 Head-up display | hud | heads up display
85 Dekatron
85 Numitron
85 Magic eye tube | magic eye | tuning eye
85 Charactron
85 Panaplex
85 Vector display | vector monitor
100 Eidophor
`);

const pcb = p("pb-pcb", "Name a part or feature of a printed circuit board", `
10 Trace | track
10 Pad | solder pad
10 Via
15 Silkscreen | silk
15 Solder mask | soldermask | solder resist
15 Ground plane | ground pour
15 Copper pour | pour | polygon pour
15 Plated through hole | through hole | pth
15 Layer | copper layer | inner layer
30 Mounting hole
30 Footprint | land pattern
30 Test point | testpoint
30 Fiducial | fiducial mark
30 Thermal relief | thermal spoke
30 Annular ring
30 Substrate | fr4 | fr-4 | core
30 Prepreg
30 Edge connector | gold fingers
30 Stitching via | via stitching
60 Blind via
60 Buried via
60 Microvia | micro via
60 Via-in-pad | via in pad
60 Castellated holes | castellations | castellated
60 Mouse bites | breakaway tabs | tab routing
60 V-score | v-groove | v cut
60 Keepout | keep out zone
60 Teardrop | teardrops
60 Controlled-impedance trace | controlled impedance
60 Panel | panelization
85 Rat's nest | ratsnest | airwire
85 Gerber | gerber file
85 Back-drill | backdrill | backdrilling
85 Guard ring
85 ENIG | electroless nickel immersion gold | surface finish | hasl
100 Test coupon | coupon | impedance coupon
`);

const bench = p("pb-bench", "Name something on an electronics workbench", `
10 Soldering iron
10 Multimeter | dmm
10 Breadboard | solderless breadboard
15 Solder
15 Oscilloscope | scope
15 Wire strippers | wire stripper
15 Jumper wires | jumper wire | dupont wires
15 Bench power supply | power supply
15 Flush cutters | side cutters | diagonal cutters | snips
15 Tweezers
30 Flux
30 Solder wick | desoldering braid | wick
30 Desoldering pump | solder sucker
30 Helping hands | third hand
30 Hot air station | rework station | hot air gun
30 Heat shrink tubing | heat shrink
30 Heat gun
30 Fume extractor
30 ESD mat | anti-static mat | antistatic mat
30 ESD wrist strap | wrist strap | antistatic wrist strap
30 Magnifying glass | magnifier | loupe
30 Isopropyl alcohol | isopropanol | ipa
30 Kapton tape | polyimide tape
30 Logic analyzer
30 Function generator | signal generator
30 Microscope | stereo microscope
60 PCB vise | pcb holder | circuit board holder
60 Crimping tool | crimper | crimp tool
60 Solder paste
60 Reflow oven | toaster oven
60 Electronic load | dc load
60 LCR meter
60 Tip tinner | tip cleaner | brass wool
60 Ultrasonic cleaner
60 Perfboard | protoboard | stripboard | veroboard
85 Flux pen
85 Spudger
85 Chip Quik | low melt solder | chipquik
85 Variac | autotransformer
100 Wire-wrap tool | wire wrap tool | wire wrap gun
`);

const arduino = p("pb-arduino", "Name a component on an Arduino Uno board", `
10 Microcontroller | atmega328p | atmega328 | mcu
10 USB port | usb connector | usb-b | usb type b
10 Reset button | reset switch
10 LED | pin 13 led | power led | builtin led
15 Headers | pin headers | female headers
15 Barrel jack | dc jack | power jack
15 Crystal | 16 mhz crystal | crystal oscillator
15 Voltage regulator | regulator | 5v regulator
30 USB-to-serial chip | atmega16u2 | 16u2 | usb serial converter
30 ICSP header | icsp | isp header
30 TX and RX LEDs | tx led | rx led | tx rx leds
30 Capacitor | decoupling capacitor | electrolytic capacitor
30 3.3V regulator | 3v3 regulator | lp2985
30 Analog pins | analog inputs
30 Digital pins | gpio
60 Polyfuse | resettable fuse | ptc fuse
60 Ceramic resonator | resonator
60 Op-amp | lmv358 | comparator
60 MOSFET | power selector mosfet
60 Diode | protection diode
60 Resistor network | resistor array
60 AREF pin | aref
60 IOREF pin | ioref
85 Ferrite bead
85 Solder jumper | reset-en jumper | reset en
85 Mounting holes
100 Map of Italy | italy | italy outline
`);

const charger = p("pb-charger", "Name a part inside a phone charger", `
10 Transformer
10 Capacitor
10 USB port | usb connector
15 Diode | rectifier
15 Bridge rectifier
15 Prongs | plug | pins
15 Circuit board | pcb
15 Resistor
30 Optocoupler | opto isolator | optoisolator
30 Controller IC | pwm controller | switching controller
30 MOSFET | switching transistor
30 Inductor | choke
30 Fuse | fusible resistor
30 Electrolytic capacitor | bulk capacitor
30 Y capacitor | y cap | safety capacitor
60 Snubber | rcd snubber | clamp
60 Voltage divider | feedback resistor divider
60 TL431 | shunt regulator | voltage reference
60 Schottky diode | output rectifier
60 Synchronous rectifier
60 Thermistor | ntc
60 Common-mode choke | common mode choke
60 USB PD controller | pd controller | power delivery chip
60 GaN transistor | gan | gallium nitride
85 Isolation slot | creepage slot | slot
85 Potting | potting compound
85 X capacitor
85 Planar transformer
85 Thermal pad | gap pad
100 Margin tape
`);

const tubes = p("pb-tubes", "Name a type of vacuum tube", `
10 Triode
10 Diode | vacuum diode | thermionic diode
15 Pentode
15 Tetrode
15 CRT | cathode ray tube
15 Nixie tube | nixie
30 Magnetron
30 Klystron
30 Thyratron
30 Beam tetrode | beam power tube | kinkless tetrode
30 Rectifier tube | 5u4 | 5ar4 | gz34
30 Traveling-wave tube | twt | travelling wave tube
30 Photomultiplier | photomultiplier tube | pmt
30 X-ray tube
30 12AX7 | ecc83
30 EL34
60 Hexode
60 Heptode | pentagrid converter | pentagrid
60 Dual triode | double triode
60 Ignitron
60 Magic eye | tuning indicator | 6e5
60 Image orthicon | orthicon
60 Iconoscope
60 Vidicon
60 Image intensifier
60 Krytron
60 Compactron
60 Nuvistor
85 Octode
85 Gyrotron
85 Acorn tube | acorn
85 Dekatron
85 Phototube | photoelectric cell
85 Audion
100 Trochotron
`);

export default {
  id: "parts-bin",
  name: "The Parts Bin",
  description: "Components, connectors, boards and the bench they live on.",
  chapters: [
    [transistors, diodes, capacitors, packages, resistors, switches, connectors],
    [sensors, displays, pcb, bench, arduino, charger, tubes],
  ],
};
