// Original EL-RILLION prompts, converted to tiers. Format: see content/dsl.mjs.
import { p } from "./dsl.mjs";

export const transistors = p("transistors", "Name a type of transistor", `
10 MOSFET | mos fet | metal oxide semiconductor field effect transistor
10 BJT | bipolar junction transistor | bipolar transistor | bipolar
10 NPN transistor | npn
10 PNP transistor | pnp
15 NMOS | n-channel mosfet | nmosfet | n channel mosfet
15 PMOS | p-channel mosfet | pmosfet | p channel mosfet
15 JFET | junction fet | junction field effect transistor
15 IGBT | insulated gate bipolar transistor
15 Darlington transistor | darlington | darlington pair
30 Phototransistor | photo transistor
30 Power MOSFET
30 Enhancement-mode MOSFET | enhancement mode | enhancement mosfet
30 FinFET | fin fet
30 Thin-film transistor | tft
30 Depletion-mode MOSFET | depletion mode | depletion mosfet
60 GaN FET | gallium nitride transistor | gan transistor | gan hemt | gallium nitride fet
60 HEMT | high electron mobility transistor
60 SiC MOSFET | silicon carbide mosfet
60 Unijunction transistor | ujt | unijunction
60 MESFET | metal semiconductor field effect transistor
60 HBT | heterojunction bipolar transistor
60 LDMOS | laterally diffused mosfet | laterally diffused mos
60 GAAFET | gate all around | gate-all-around fet | gaa fet | ribbonfet | mbcfet
60 Floating-gate MOSFET | fgmos | floating gate transistor | floating gate
60 Schottky transistor | schottky clamped transistor
85 Dual-gate MOSFET | dual gate mosfet | tetrode mosfet
85 Superjunction MOSFET | super junction mosfet | superjunction
85 Point-contact transistor | point contact
85 Organic FET | ofet | organic field effect transistor | organic transistor
85 Tunnel FET | tfet | tunnel field effect transistor
85 Programmable unijunction transistor | put
85 Avalanche transistor
85 Multiple-emitter transistor | multi emitter transistor | multiemitter transistor
85 ISFET | ion sensitive field effect transistor
85 Sziklai pair | complementary feedback pair | sziklai
85 CNTFET | carbon nanotube fet | carbon nanotube transistor
100 Spacistor
`);

export const diodes = p("diodes", "Name a type of diode", `
10 LED | light emitting diode
10 Zener diode | zener
15 Schottky diode | schottky | schottky barrier diode | hot carrier diode
15 Rectifier diode | rectifier | power diode
15 Photodiode | photo diode
15 Laser diode | laser
15 Signal diode | small signal diode | 1n4148
30 OLED | organic led | organic light emitting diode
30 TVS diode | transient voltage suppressor | tvs
30 Varactor | varicap | varactor diode | varicap diode | tuning diode
30 Tunnel diode | esaki diode | esaki
30 Germanium diode
30 PIN diode | p-i-n diode | pin
30 DIAC
30 Avalanche diode
60 Fast recovery diode | fast recovery | ultrafast diode | ultra fast recovery diode
60 Avalanche photodiode | apd
60 Vacuum tube diode | vacuum diode | thermionic diode | fleming valve
60 Gunn diode | transferred electron device
60 Crystal detector | cat's whisker | cats whisker detector | crystal diode | cat's-whisker detector
60 Shockley diode | four layer diode | pnpn diode
60 SiC Schottky diode | silicon carbide schottky | sic diode | sic schottky
60 Step recovery diode | snap diode | srd | snap-off diode
85 IMPATT diode | impatt
85 Constant-current diode | current regulative diode | crd | current limiting diode
85 Selenium rectifier | selenium diode
85 Superluminescent diode | sled | superluminescent led
85 TRAPATT diode | trapatt
85 Backward diode | back diode
85 Super barrier diode | super barrier rectifier | sbr
85 BARITT diode | baritt
85 Gold-doped diode | gold doped
100 Copper-oxide rectifier | cuprous oxide rectifier | copper oxide diode
`);

export const capacitors = p("capacitors", "Name a type of capacitor", `
10 Ceramic capacitor | ceramic | mlcc | multilayer ceramic capacitor
10 Electrolytic capacitor | electrolytic | aluminum electrolytic | aluminium electrolytic
15 Tantalum capacitor | tantalum
15 Supercapacitor | ultracapacitor | supercap | edlc | electric double layer capacitor | double layer capacitor
15 Film capacitor | film | plastic film capacitor
15 Variable capacitor | variable | tuning capacitor | air variable capacitor
30 Mica capacitor | silver mica | mica | silver mica capacitor
30 Polymer capacitor | polymer | aluminum polymer | conductive polymer capacitor
30 Trimmer capacitor | trimmer | trimcap
30 Polyester capacitor | mylar capacitor | pet capacitor | mylar
30 Polypropylene capacitor | pp capacitor | polypropylene
30 Motor run capacitor | run capacitor | motor start capacitor | start capacitor
30 Paper capacitor | paper
60 Safety capacitor | x capacitor | y capacitor | x2 capacitor | y2 capacitor | class x | class y
60 Leyden jar | leyden
60 Bipolar electrolytic | non polarized electrolytic | bipolar capacitor | nonpolar electrolytic
60 Polystyrene capacitor | polystyrene
60 Air-gap capacitor | air capacitor | air dielectric capacitor
60 Oil-filled capacitor | oil capacitor | paper in oil
60 Vacuum capacitor | vacuum variable
60 Feedthrough capacitor | feed through capacitor
85 Polycarbonate capacitor | polycarbonate
85 Glass capacitor
85 PTFE capacitor | teflon capacitor
85 Niobium oxide capacitor | niobium capacitor | niobium
85 Lithium-ion capacitor | hybrid capacitor | lic
85 Silicon capacitor
85 PPS capacitor | polyphenylene sulfide capacitor
100 Gimmick capacitor | gimmick
`);

export const packages = p("packages", "Name an IC or component package", `
10 DIP | dual inline package | dil | pdip | dual in-line package
10 TO-220
10 SOIC | small outline integrated circuit
15 BGA | ball grid array
15 TO-92
15 QFN | quad flat no-lead | mlf | mlp | micro leadframe
15 QFP | quad flat package
15 SOT-23
15 TQFP | thin quad flat package
15 TSSOP | thin shrink small outline package
30 DPAK | to-252
30 LQFP | low profile quad flat package
30 D2PAK | to-263 | ddpak
30 TO-247
30 DFN | dual flat no-lead
30 TO-3
30 PGA | pin grid array
30 PLCC | plastic leaded chip carrier
30 SOT-223
30 LGA | land grid array
30 SSOP | shrink small outline package
30 MSOP | micro small outline package
30 SIP | single inline package | single in-line package
30 SOD-123
60 TSOP | thin small outline package
60 WLCSP | wafer level chip scale package | csp | chip scale package | wlp
60 Flip chip | c4
60 SOT-89
60 SC-70 | sot-323
60 TO-126
60 COB | chip on board
60 TO-5
60 TO-18
60 CERDIP | ceramic dip
60 MELF | metal electrode leadless face
60 PowerPAK | powerpak so-8
85 LCC | leadless chip carrier
85 SOJ | small outline j-lead
85 CQFP | ceramic quad flat pack
85 TO-264
85 ZIP | zig zag inline package | zigzag in-line package
85 QIP | quad inline package | quil
85 Flatpack | flat pack | flat package
85 TO-66
100 BBUL | bumpless build-up layer
`);

export const resistors = p("resistors", "Name a type of resistor", `
10 Potentiometer | pot
10 Thermistor | ntc | ptc | ntc thermistor | ptc thermistor
10 Carbon film resistor | carbon film
15 Metal film resistor | metal film
15 Rheostat
15 Wirewound resistor | wire wound | wirewound
15 Photoresistor | ldr | light dependent resistor | photocell | cds cell
15 SMD resistor | surface mount resistor | chip resistor
15 Carbon composition resistor | carbon composition | carbon comp
15 Trimmer potentiometer | trimpot | trimmer | preset
15 Varistor | mov | metal oxide varistor | vdr | voltage dependent resistor
30 Shunt resistor | current shunt | shunt | current sense resistor | sense resistor
30 Thick film resistor | thick film
30 Thin film resistor | thin film
30 RTD | resistance temperature detector | platinum resistance thermometer | pt100 | pt1000
30 Zero-ohm resistor | zero ohm link | 0 ohm resistor | jumper resistor
30 Metal oxide film resistor | metal oxide resistor
30 Strain gauge | strain gage
30 Resistor network | resistor array | sip resistor | resistor pack
30 Digital potentiometer | digipot | digital pot
30 Fusible resistor | fuse resistor
60 Cement resistor | ceramic encased resistor
60 Metal foil resistor | foil resistor | bulk metal foil
60 Ballast resistor
60 Magnetoresistor | magnetoresistive sensor | magnetic dependent resistor
60 Force sensing resistor | fsr | force sensitive resistor
60 Cermet resistor | cermet
60 Memristor
60 Braking resistor | dynamic braking resistor
85 Liquid rheostat | water rheostat | salt water rheostat
85 Slide-wire | slide wire | slidewire
85 Humistor | humidity resistor | hygristor
85 Carbon pile | carbon pile resistor | carbon pile rheostat
85 Barretter
100 Ayrton-Perry winding | ayrton perry | ayrton-perry resistor
`);

export const opampCircuits = p("opamp-circuits", "Name an op-amp circuit", `
10 Inverting amplifier | inverting | inverting amp
10 Non-inverting amplifier | non inverting | noninverting | non-inverting amp
10 Voltage follower | buffer | unity gain buffer | voltage buffer | unity gain amplifier | follower
10 Integrator | op amp integrator | miller integrator
15 Summing amplifier | summer | adder | summing amp | inverting summer
15 Differentiator
15 Difference amplifier | differential amplifier | subtractor | difference amp
15 Comparator
15 Schmitt trigger
15 Instrumentation amplifier | in-amp | inamp | instrumentation amp
15 Active filter
15 Transimpedance amplifier | tia | current to voltage converter | i to v converter
30 Wien bridge oscillator | wien bridge
30 Sallen-Key filter | sallen key
30 Precision rectifier | superdiode | super diode | active rectifier
30 Logarithmic amplifier | log amp | log amplifier
30 Phase shift oscillator | rc phase shift oscillator
30 Peak detector
30 Relaxation oscillator | astable multivibrator
30 Sample and hold | track and hold
30 Antilog amplifier | exponential amplifier | antilog amp
30 Multiple feedback filter | mfb filter | rauch filter
30 Window comparator
60 Voltage-to-current converter | transconductance amplifier | v to i converter
60 All-pass filter | phase shifter | allpass
60 Charge amplifier
60 State variable filter | kerwin huelsman newcomb | khn filter
60 Twin-T notch filter | twin t | twin-t
60 Howland current pump | howland current source | howland
60 Gyrator
60 Bridge amplifier
60 Negative impedance converter | nic
60 Bootstrapped amplifier | bootstrap
60 Capacitance multiplier
85 Composite amplifier
85 Generalized impedance converter | gic
85 Tow-Thomas biquad | tow thomas | tow-thomas
85 Fliege notch filter | fliege filter
85 Bainter notch filter | bainter filter
100 Ackerberg-Mossberg biquad | ackerberg mossberg
`);

export const oscillators = p("oscillators", "Name a type of electronic oscillator", `
10 Crystal oscillator | crystal | xo | quartz oscillator
10 555 timer oscillator | 555 astable | 555 | astable 555
10 Colpitts oscillator | colpitts
15 LC oscillator | tank circuit oscillator
15 Hartley oscillator | hartley
15 RC oscillator
15 Wien bridge oscillator | wien bridge
15 Phase shift oscillator | rc phase shift
15 Relaxation oscillator
15 Ring oscillator
15 VCO | voltage controlled oscillator
15 Astable multivibrator | astable
30 Clapp oscillator | clapp
30 Pierce oscillator | pierce
30 Armstrong oscillator | armstrong | tickler oscillator | meissner oscillator
30 TCXO | temperature compensated crystal oscillator
30 Atomic clock | rubidium oscillator | cesium oscillator | atomic oscillator
30 OCXO | oven controlled crystal oscillator
30 MEMS oscillator
30 Cross-coupled oscillator | cross coupled lc | negative resistance oscillator
30 NCO | numerically controlled oscillator | dds | direct digital synthesis
30 Blocking oscillator
60 Magnetron | cavity magnetron
60 Royer oscillator | royer
60 Klystron | reflex klystron
60 Gunn oscillator
60 Quadrature oscillator
60 Twin-T oscillator
60 Seiler oscillator | seiler
85 Delay line oscillator
85 Backward wave oscillator | bwo | carcinotron
85 Vackář oscillator | vackar
85 Dynatron oscillator | dynatron
85 Butler oscillator | butler
85 Opto-electronic oscillator | oeo
85 Franklin oscillator | franklin
85 Pearson-Anson oscillator | pearson anson | neon lamp oscillator
100 Tri-tet oscillator | tritet | tri tet
`);

export const amplifiers = p("amplifiers", "Name an amplifier class or topology", `
10 Class A
10 Class AB
10 Class B
10 Class D
15 Class C
15 Common emitter | ce amplifier | common emitter amplifier
15 Push-pull | push pull
15 Common collector | emitter follower | cc amplifier
15 Common base | cb amplifier
15 Common source
15 Differential pair | long tailed pair | differential amplifier | emitter coupled pair
15 Common drain | source follower
15 Common gate
15 Class G
30 Cascode
30 Class H
30 Class E
30 Darlington | darlington pair
30 Class F
30 Totem pole
30 Doherty amplifier | doherty
30 Lock-in amplifier | lock in
30 Bridge-tied load | btl | bridged amplifier
30 Gilbert cell | gilbert multiplier
30 Chopper amplifier | chopper stabilized | chopper
60 Single-ended triode | set amplifier
60 Magnetic amplifier | magamp | mag amp | transductor
60 Class T | tripath
60 Distributed amplifier | traveling wave amplifier
60 Parametric amplifier | paramp
60 Class S
60 OTL amplifier | output transformerless
60 Quasi-complementary | quasi complementary output stage
60 Class BD
60 Ultra-linear | ultralinear
60 Outphasing amplifier | chireix | chireix outphasing | linc
85 Class I
85 Class J
85 Futterman | futterman otl
100 Current dumping | quad current dumping | quad current-dumping
`);

export const filters = p("filters", "Name a filter type or response", `
10 Low-pass filter | low pass | lowpass | lpf
10 High-pass filter | high pass | highpass | hpf
10 Band-pass filter | band pass | bandpass | bpf
10 Butterworth
15 Band-stop filter | band stop | bandstop | notch filter | notch | band reject
15 Chebyshev | chebyshev type i | chebyshev type 1 | tschebyscheff
15 Bessel | bessel-thomson | thomson
15 FIR filter | finite impulse response | fir
15 Elliptic | cauer | elliptic filter | zolotarev
15 IIR filter | infinite impulse response | iir
15 Kalman filter | kalman
15 Moving average filter | moving average | boxcar filter
15 RC filter
15 All-pass filter | all pass | allpass
30 Gaussian filter | gaussian
30 LC filter
30 Comb filter
30 Sallen-Key | sallen key
30 Median filter
30 Pi filter | pi network | clc filter
30 Matched filter
30 Wiener filter | wiener
30 Inverse Chebyshev | chebyshev type ii | chebyshev type 2
30 Linkwitz-Riley | linkwitz riley
30 Crystal filter | quartz filter | lattice filter
30 SAW filter | surface acoustic wave
30 Twin-T | twin t
30 Raised-cosine filter | raised cosine | root raised cosine | rrc
30 Ceramic filter
60 Cavity filter
60 CIC filter | cascaded integrator comb | hogenauer filter
60 Savitzky-Golay filter | savitzky golay
60 Halfband filter | half band
60 Mechanical filter
60 Zobel network | zobel
60 Constant-k filter | constant k | image filter | image parameter filter
60 Legendre filter | optimum l | papoulis | legendre-papoulis
60 m-derived filter | m derived
60 Wave digital filter
60 Gammatone filter | gammatone
85 Synchronous filter
85 Lerner filter | lerner
85 Paynter filter | paynter
100 Ultraspherical filter | gegenbauer filter
`);

export const famousParts = p("famous-parts", "Name a famous chip or part number", `
10 555 | ne555 | lm555 | 555 timer
10 7805 | lm7805 | l7805 | 78xx | 7812 | 7905
10 741 | ua741 | lm741 | μa741
10 2N2222 | pn2222
15 LM317 | 317
15 ATmega328P | atmega328 | 328p
15 LM358 | 358
15 2N3904 | 3904
15 7400 | sn7400 | 74ls00 | 74hc00
15 1N4007 | 1n4001 | 1n400x
15 74HC595 | 595 | 74595
15 ESP8266
15 LM386 | 386
15 1N4148 | 4148
15 L293D | l293
15 LM324 | 324
15 ULN2003 | uln2803
30 4017 | cd4017
30 L298N | l298
30 TL071 | tl072 | tl074 | tl07x
30 BC547
30 MAX232 | max3232
30 NE5532 | 5532
30 8051 | intel 8051 | mcs-51
30 LM339 | 339
30 Z80 | zilog z80
30 6502 | mos 6502
30 8086 | intel 8086
30 556 | ne556
30 4004 | intel 4004
30 LM311 | 311
30 LM35
30 TL431 | 431
30 DS18B20
30 2N3055 | 3055
30 LM1117 | ams1117 | 1117
30 IRF540 | irf540n
60 LM3914 | 3914
60 CD4046 | 4046
60 LM3886 | 3886
60 TDA2030
60 NE567 | 567 tone decoder | 567
60 OP27
60 LM13700 | lm13600
60 SID 6581 | 6581 | mos 6581 | sid chip
85 CA3080 | 3080
85 MC1496 | 1496
85 AY-3-8910
85 SN76489 | 76489
85 CA3046 | 3046
85 μA709 | 709 | ua709
85 LM309 | 309
85 μA702 | 702 | ua702
100 Intel 3101 | 3101
`);

export const logicElements = p("logic-elements", "Name a logic gate, latch or flip-flop", `
10 AND gate | and
10 OR gate | or
10 NOT gate | inverter | not
10 NAND gate | nand
15 NOR gate | nor
15 XOR gate | xor | exclusive or | eor
15 XNOR gate | xnor | exclusive nor | equivalence gate
15 D flip-flop | d flipflop | dff | data flip flop | d type flip flop
15 JK flip-flop | jk | j-k flip flop | jk flipflop
15 SR latch | sr flip flop | rs latch | set reset latch | rs flip flop
15 Buffer | buffer gate
15 T flip-flop | toggle flip flop | t flipflop
15 D latch | gated d latch | transparent latch
15 Multiplexer | mux
30 Demultiplexer | demux
30 Master-slave flip-flop | master slave
30 Tri-state buffer | tristate | three state buffer | tri state
30 Gated SR latch | gated sr
30 Schmitt trigger inverter | schmitt trigger
30 Transmission gate | pass gate | analog switch
30 Open-collector buffer | open collector | open drain
30 Majority gate | majority function | voter
60 IMPLY gate | implication gate | imply
60 AND-OR-Invert | aoi | aoi gate
60 Toffoli gate | ccnot | toffoli
60 OR-AND-Invert | oai | oai gate
60 Fredkin gate | cswap | fredkin
60 Muller C-element | c-element | muller c element | c element
60 Dual-edge-triggered flip-flop | double edge triggered | detff
60 Scan flip-flop | scan ff
60 NIMPLY gate | material nonimplication | abjunction | inhibition gate | nimply
60 Pulsed latch
85 Earle latch | earle
85 Sense-amplifier flip-flop | saff
100 Parametron
`);

export const buses = p("buses", "Name a serial protocol or bus", `
10 UART | universal asynchronous receiver transmitter
10 I2C | i squared c | iic | i²c | twi | two wire interface
10 SPI | serial peripheral interface
10 USB | universal serial bus
15 CAN | can bus | controller area network
15 RS-232
15 Ethernet
15 RS-485
15 PCIe | pci express
15 SATA | serial ata
15 JTAG
15 1-Wire | one wire | onewire
15 HDMI
30 Modbus
30 I2S | i²s | iis | inter-ic sound
30 SWD | serial wire debug
30 Thunderbolt
30 DisplayPort | dp
30 MIDI
30 LIN | lin bus | local interconnect network
30 FireWire | ieee 1394 | ieee1394 | i.link
30 SMBus | system management bus
30 QSPI | quad spi
30 DMX512 | dmx
30 PS/2
30 SDIO
30 GPIB | ieee 488 | hp-ib | hpib
30 FlexRay
30 MIPI CSI | csi-2 | csi
30 PMBus
60 MIPI DSI | dsi
60 PROFIBUS
60 EtherCAT
60 I3C | improved inter integrated circuit
60 DALI | digital addressable lighting interface
60 HDLC
60 HART
60 MIL-STD-1553 | 1553
60 MDIO | smi
60 M-Bus | meter bus | mbus
60 ARINC 429
60 JESD204 | jesd204b | jesd204c
60 SENT | single edge nibble transmission
60 SPMI | system power management interface
85 SpaceWire
85 SSI | synchronous serial interface
85 AS-Interface | as-i | asi
85 ADB | apple desktop bus
85 EnDat
85 PSI5
85 BiSS | biss-c
85 DSI3 | distributed system interface
100 ACCESS.bus | access bus
`);

export const mcus = p("mcus", "Name a microcontroller family or architecture", `
10 ARM Cortex-M | cortex-m | cortex m | cortex m0 | cortex m3 | cortex m4 | arm cortex m | arm
10 AVR | atmega | attiny | atmel avr
10 PIC | pic microcontroller | pic16 | pic18 | pic32
10 ESP32
15 8051 | mcs-51 | intel 8051
15 STM32
15 RISC-V
15 RP2040 | raspberry pi pico | rp2350
15 MSP430
15 ESP8266
30 nRF52 | nrf52832 | nrf52840 | nordic nrf52
30 SAMD21 | sam d21 | atsamd21
30 dsPIC | dspic33
30 PSoC
30 LPC | nxp lpc
30 STM8
30 Kinetis | nxp kinetis
30 XMEGA | atxmega
30 68HC11 | hc11
30 C2000 | ti c2000 | tms320f28x
30 RL78 | renesas rl78
30 Propeller | parallax propeller
30 BASIC Stamp | stamp
30 Renesas RX | rx
30 68HC08 | hc08
60 CH32V | ch32v003
60 68000 | m68k | motorola 68000
60 HCS12 | hc12 | 68hc12 | s12
60 SuperH | sh-2 | sh-4
60 TriCore | aurix
60 XMOS xCORE | xcore | xmos
60 Padauk | padauk pms150c
60 RH850
60 H8 | h8/300
60 8048 | mcs-48 | intel 8048
60 6800 | motorola 6800
60 Z8 | zilog z8
60 eZ80
60 8096 | mcs-96
60 ST7
60 TMS1000
85 COP8
85 V850
85 MAXQ
85 GA144 | greenarrays
85 Fairchild F8 | f8 | mostek 3870
100 PPS-4 | rockwell pps-4
`);

export const memory = p("memory", "Name a type of computer memory", `
10 RAM | random access memory
10 ROM | read only memory
10 DRAM | dynamic ram
10 SRAM | static ram
15 Flash | flash memory
15 EEPROM | e2prom
15 NAND flash
15 EPROM | uv eprom
15 NOR flash
15 SDRAM | synchronous dram
15 PROM | otp | one time programmable
15 DDR SDRAM | ddr | ddr2 | ddr3 | ddr4 | ddr5
15 Cache | cache memory | l1 cache
15 Register | register file
30 Core memory | magnetic core | magnetic core memory | ferrite core
30 GDDR | gddr5 | gddr6
30 HBM | high bandwidth memory
30 eMMC
30 LPDDR | lpddr4 | lpddr5
30 3D NAND | v-nand | vnand
30 MRAM | magnetoresistive ram | stt-mram
30 FRAM | feram | ferroelectric ram
30 NVRAM | non volatile ram | battery backed sram
30 VRAM | video ram
30 ReRAM | rram | resistive ram
30 Mask ROM | mrom
30 Phase-change memory | pcm | pram | 3d xpoint | optane
30 CAM | content addressable memory | tcam
30 PSRAM | pseudo static ram
30 Drum memory | magnetic drum
60 Bubble memory | magnetic bubble
60 Delay line memory | mercury delay line | acoustic delay line
60 RDRAM | rambus | rambus dram
60 Core rope memory | rope memory
60 EDO RAM | edo dram
60 Williams tube | williams kilburn tube
60 SGRAM
60 FPM DRAM | fast page mode
60 Holographic memory
60 CBRAM | conductive bridging ram
60 SONOS
85 Racetrack memory | domain wall memory
85 NRAM | nano ram | carbon nanotube memory
85 Thin-film memory
85 Selectron tube | selectron
85 Plated wire memory | plated wire
85 Twistor memory | twistor
85 Millipede memory | millipede
85 Dekatron
100 Biax memory | biax
`);

export const eda = p("eda", "Name a hardware language or EDA tool", `
10 Verilog
10 VHDL
10 SPICE | ngspice | hspice
10 LTspice | lt spice
15 KiCad
15 Altium Designer | altium
15 Eagle | autodesk eagle | cadsoft eagle
15 SystemVerilog
15 Multisim | ni multisim
15 MATLAB
15 OrCAD
15 Simulink
15 Quartus | intel quartus | quartus prime
15 Cadence Virtuoso | virtuoso
30 Vivado | xilinx vivado
30 ModelSim | questa | questasim
30 Proteus
30 EasyEDA
30 Cadence Allegro | allegro
30 Fritzing
30 PSpice
30 SystemC
30 Chisel
30 Verilator
30 Icarus Verilog | iverilog
30 Yosys
30 HFSS | ansys hfss
30 GHDL
30 ADS | keysight ads | advanced design system
60 Design Compiler | synopsys design compiler
60 DipTrace
60 KLayout
60 CST Studio | cst | cst microwave studio
60 Bluespec | bluespec systemverilog | bsv
60 Qucs | qucs-s
60 Magic VLSI | magic
60 PADS | mentor pads | pads layout
60 OpenROAD
60 MyHDL
60 PrimeTime
60 Calibre | mentor calibre
60 SpinalHDL
60 Xpedition
60 Amaranth | nmigen
60 gEDA | gschem
60 Sonnet
60 Clash | clash hdl
60 ABEL
60 Electric VLSI
85 AHDL | altera hdl
85 CUPL
85 PALASM
85 Lola | lola hdl
100 CONLAN
`);

export const converters = p("converters", "Name a power converter topology", `
10 Buck converter | buck | step down converter
10 Boost converter | boost | step up converter
10 Buck-boost converter | buck boost | inverting buck boost
10 Flyback converter | flyback
15 Linear regulator | ldo | low dropout regulator | linear
15 Charge pump | switched capacitor converter
15 Forward converter | forward
15 Half-bridge converter | half bridge
15 Push-pull converter | push pull
15 Full-bridge converter | full bridge | h bridge converter
15 SEPIC | single ended primary inductor converter
15 Synchronous buck | synchronous rectifier buck
15 Ćuk converter | cuk
15 LLC resonant converter | llc | llc resonant
30 Boost PFC | pfc | power factor correction
30 Cockcroft-Walton multiplier | cockcroft walton | voltage multiplier | cw multiplier
30 Zeta converter | zeta
30 Phase-shifted full bridge | psfb | phase shifted full bridge
30 Interleaved buck | multiphase buck | interleaved
30 Series resonant converter | src
30 Two-switch forward | double ended forward | two transistor forward
30 Dickson charge pump | dickson
30 Active clamp forward | active clamp
30 Quasi-resonant flyback | quasi resonant | qr flyback | valley switching
30 Totem-pole PFC | totem pole pfc | bridgeless pfc
30 Parallel resonant converter | prc
30 Dual active bridge | dab
30 Villard circuit | voltage doubler | villard
60 Royer converter | royer
60 Cycloconverter
60 Greinacher circuit | greinacher | delon
60 LCC resonant converter | lcc
60 Vienna rectifier | vienna
60 Neutral-point clamped inverter | npc | npc inverter
60 Matrix converter
60 Flying capacitor converter | flying capacitor | three level buck | multilevel
60 Modular multilevel converter | mmc
60 Tapped-inductor buck | tapped inductor
60 Z-source inverter | z source | impedance source
60 Quadratic buck
60 Superbuck | super buck
85 Weinberg converter | weinberg
85 Watkins-Johnson converter | watkins johnson
85 Landsman converter | landsman
100 Sheppard-Taylor converter | sheppard taylor
`);

export const motors = p("motors", "Name a type of electric motor", `
10 DC motor | brushed dc | brushed motor | brushed dc motor
10 Brushless DC motor | bldc | brushless | brushless motor
10 Stepper motor | stepper | step motor | stepping motor
10 Induction motor | asynchronous motor | squirrel cage | squirrel cage motor
15 Servo motor | servo
15 Synchronous motor
15 Universal motor
15 Linear motor | linear induction motor | lim
15 PMSM | permanent magnet synchronous motor
15 Series wound motor | series dc motor
15 Switched reluctance motor | srm | switched reluctance
30 Shaded pole motor | shaded pole
30 Shunt wound motor | shunt dc motor
30 Wound rotor motor | slip ring motor | wound rotor induction motor
30 Split-phase motor | split phase
30 Synchronous reluctance motor | synrm
30 Compound wound motor | compound motor
30 Coreless motor | coreless dc | ironless motor
30 Capacitor-start motor | capacitor start | psc motor | permanent split capacitor
30 Axial flux motor | pancake motor | axial flux
30 Homopolar motor | faraday motor | unipolar motor
30 Voice coil motor | voice coil | vcm
30 Outrunner | outrunner motor
30 Piezoelectric motor | piezo motor | ultrasonic motor
30 Hub motor | wheel hub motor | in wheel motor
30 Hysteresis motor
30 Hybrid stepper
30 Torque motor
30 Variable reluctance stepper
30 Electrostatic motor | corona motor
60 Doubly-fed induction machine | dfig | doubly fed
60 Repulsion motor
60 Claw-pole motor | claw pole | can stack motor | tin can stepper
60 Barlow's wheel | barlow wheel
60 Inchworm motor | inchworm
60 Ball bearing motor | huber motor
85 Schrage motor | schrage
85 Deri motor | deri
100 Mendocino motor | mendocino
`);

export const batteries = p("batteries", "Name a battery chemistry", `
10 Lithium-ion | li-ion | li ion | lithium ion
10 Lead-acid | lead acid | sla | agm
10 Alkaline | zinc manganese dioxide | alkaline manganese
10 NiMH | nickel metal hydride
15 NiCd | nickel cadmium | nicad
15 LiFePO4 | lithium iron phosphate | lfp
15 Lithium polymer | lipo | li-po | li polymer
15 Zinc-carbon | zinc carbon | leclanche | carbon zinc
15 Solid-state battery | solid state
15 Sodium-ion | sodium ion | na-ion
15 Lithium coin cell | cr2032 | lithium manganese dioxide | li-mno2
15 Silver oxide | silver oxide cell
30 Zinc-air | zinc air
30 NMC | nickel manganese cobalt | lithium nickel manganese cobalt oxide
30 Lithium cobalt oxide | lco | licoo2
30 Lithium-sulfur | li-s | lithium sulfur
30 NCA | lithium nickel cobalt aluminium oxide
30 Vanadium redox flow | vanadium flow | vrfb | flow battery | redox flow
30 LTO | lithium titanate
30 LMO | lithium manganese oxide
30 Mercury battery | mercury cell | zinc mercury oxide
30 Nickel-iron | nickel iron | edison battery | ni-fe
30 Voltaic pile | volta pile | voltaic
30 Nickel-zinc | ni-zn | nizn
30 Sodium-sulfur | nas | sodium sulfur
30 Lithium thionyl chloride | li-socl2
30 Lithium-air | lithium air | li-air
30 Lithium iron disulfide | li-fes2
30 Aluminum-air | aluminium air | aluminum air
30 Zinc-bromine | zinc bromine flow | zinc bromine
30 Iron-air | iron air
60 Silver-zinc | silver zinc
60 Lithium-metal | lithium metal
60 Zebra battery | sodium nickel chloride | zebra
60 Daniell cell | daniell
60 Nickel-hydrogen | ni-h2 | nickel hydrogen
60 Baghdad battery | parthian battery
60 Magnesium battery | magnesium ion
60 Thermal battery | molten salt battery
60 Betavoltaic | nuclear battery | atomic battery
60 Dry pile | zamboni pile
60 Weston cell | weston standard cell | cadmium cell
60 Bunsen cell | bunsen
60 Grove cell | grove
60 Clark cell | clark standard cell
60 Gravity cell | crowfoot battery
85 Planté cell | plante
85 Poggendorff cell | bichromate cell | chromic acid cell
85 Lalande cell | lalande | copper oxide cell
100 Smee cell | smee
`);

export const generation = p("generation", "Name a way to generate electricity", `
10 Solar panel | solar | photovoltaic | pv | solar power | solar pv
10 Wind turbine | wind | wind power
10 Hydroelectric | hydro | hydropower | dam
10 Nuclear fission | nuclear | nuclear power | fission
15 Coal power | coal
15 Natural gas | gas turbine | gas power
15 Geothermal
15 Diesel generator | diesel
15 Tidal power | tidal
15 Biomass | biomass power
15 Wave power | wave energy
15 Fuel cell | hydrogen fuel cell
15 Combined cycle | ccgt | combined cycle gas turbine
30 Concentrated solar power | csp | solar thermal
30 Pumped hydro | pumped storage
30 Thermoelectric generator | teg | seebeck generator
30 Dynamo | hand crank generator | hand crank
30 Piezoelectric generator | piezoelectric | piezo
30 Nuclear fusion | fusion
30 Radioisotope thermoelectric generator | rtg | radioisotope generator
30 Regenerative braking | regen braking
30 Van de Graaff generator | van de graaff
30 Waste-to-energy | incineration
30 Stirling generator | stirling engine
30 Run-of-the-river | run of river
30 Landfill gas
30 Ocean thermal energy conversion | otec | ocean thermal
30 Triboelectric generator | teng | triboelectric nanogenerator
30 Osmotic power | salinity gradient | pressure retarded osmosis | blue energy
60 MHD generator | magnetohydrodynamic generator | mhd | magnetohydrodynamic
60 Wimshurst machine | wimshurst
60 Airborne wind | kite power | airborne wind energy
60 Solar updraft tower | solar chimney
60 Microbial fuel cell | mfc
60 Thermionic converter | thermionic generator
60 Betavoltaic | nuclear battery
60 Kelvin water dropper | kelvin water drop
60 Homopolar generator | faraday disc | unipolar generator
60 Thermophotovoltaic | tpv
60 Rectenna | rectifying antenna
60 Pyroelectric generator
60 Vortex-induced vibration | vivace | vortex bladeless
60 AMTEC | alkali metal thermal to electric converter
85 Thermoacoustic generator
100 Thermogalvanic cell | thermocell
`);

export const protection = p("protection", "Name a circuit protection device", `
10 Fuse
10 Circuit breaker | breaker | mcb | miniature circuit breaker
10 GFCI | ground fault circuit interrupter | rcd | gfi | rccb | residual current device | elcb
10 Surge protector | surge suppressor | spd | surge protection device
15 MOV | varistor | metal oxide varistor
15 TVS diode | transient voltage suppressor | tvs
15 Polyfuse | pptc | resettable fuse | polyswitch
15 Lightning rod | lightning conductor | air terminal
15 AFCI | arc fault circuit interrupter | afdd | arc fault
15 Lightning arrester | surge arrester | lightning arrestor
15 Gas discharge tube | gdt | gas tube arrester
15 Zener clamp | zener diode | zener
15 Thermal fuse | thermal cutoff | tco
15 Crowbar circuit | crowbar | scr crowbar
30 Overload relay | thermal overload relay
30 Ferrite bead
30 RCBO
30 Isolation transformer
30 Optocoupler | opto isolator | optoisolator | photocoupler
30 eFuse | electronic fuse
30 Reverse polarity diode | reverse polarity protection
30 Current limiting resistor | current limiter
30 Inrush current limiter | ntc inrush | inrush limiter
30 PTC thermistor | ptc
30 Hot-swap controller | hot swap
30 Snubber | rc snubber
30 Spark gap
30 Bimetallic strip | bimetal switch
30 Ideal diode controller | ideal diode
30 Protective relay | differential relay | distance relay
30 Ground rod | earth rod | earth electrode | earthing
30 HRC fuse | high rupturing capacity fuse | hrc
30 Recloser | autorecloser
30 Faraday cage
60 Voltage supervisor | supervisor ic | reset ic | brownout detector
60 Watchdog timer | watchdog
60 ESD diode | esd protection | esd suppressor
60 Sectionalizer
60 Expulsion fuse | drop out fuse | cutout fuse
60 Fault current limiter | superconducting fault current limiter | sfcl
60 Neutral grounding resistor | ngr
60 Thyristor surge protector | tspd | sidactor
60 Petersen coil | arc suppression coil | ground fault neutralizer
60 Buchholz relay | buchholz
85 Is-limiter | is limiter
85 Horn gap | horn gap arrester
100 Carbon block protector | carbon block arrester | carbon block
`);

export const modulation = p("modulation", "Name a modulation scheme", `
10 AM | amplitude modulation
10 FM | frequency modulation
10 PWM | pulse width modulation | pulse duration modulation
10 QAM | quadrature amplitude modulation | 16-qam | 64-qam | 256-qam
15 PM | phase modulation
15 PSK | phase shift keying
15 BPSK | binary psk
15 QPSK | quadrature psk | 4-psk
15 FSK | frequency shift keying
15 ASK | amplitude shift keying
15 OOK | on off keying
15 OFDM | orthogonal frequency division multiplexing
15 PCM | pulse code modulation
15 PAM | pulse amplitude modulation | pam4
30 PPM | pulse position modulation
30 SSB | single sideband
30 Delta-sigma modulation | sigma delta | delta sigma | σδ
30 8PSK | 8-psk
30 DSB-SC | double sideband suppressed carrier | dsb
30 GFSK | gaussian fsk
30 GMSK | gaussian msk
30 MSK | minimum shift keying
30 VSB | vestigial sideband | 8vsb
30 DPSK | differential psk | dbpsk
30 DQPSK | π/4-dqpsk | pi/4 dqpsk
30 OQPSK | offset qpsk
30 APSK | 16apsk | amplitude phase shift keying
30 DSSS | direct sequence spread spectrum
30 CSS | chirp spread spectrum | lora modulation
30 FHSS | frequency hopping
30 Delta modulation
30 PDM | pulse density modulation
30 MFSK | multiple fsk
30 CW | continuous wave | morse
60 TCM | trellis coded modulation
60 AFSK | audio fsk
60 CPM | continuous phase modulation
60 DMT | discrete multitone
60 SC-FDMA | single carrier fdma
60 Polar modulation
60 CCK | complementary code keying
60 OTFS | orthogonal time frequency space
60 Index modulation | spatial modulation
60 PIM | pulse interval modulation
60 Faster-than-Nyquist | ftn
85 FQPSK | feher qpsk | feher's qpsk
100 Tamed FM | tfm | tamed frequency modulation
`);

export const antennas = p("antennas", "Name a type of antenna", `
10 Dipole | dipole antenna | half wave dipole
10 Yagi-Uda | yagi | yagi antenna
10 Monopole | whip | whip antenna | quarter wave
10 Parabolic dish | dish | parabolic | satellite dish | parabolic reflector
15 Patch antenna | microstrip antenna | patch
15 Phased array
15 Horn antenna | horn
15 Helical antenna | helix
15 Loop antenna | loop | magnetic loop
15 Log-periodic | log periodic | lpda
15 Rubber ducky | rubber duck | rubber ducky antenna
15 Slot antenna | slot
15 Ground plane antenna | ground plane
15 Folded dipole
30 J-pole | j pole | zepp
30 Long wire | random wire | longwire | end fed
30 Discone
30 Biconical antenna | bow tie | bowtie antenna | biconical
30 Inverted-F antenna | pifa | planar inverted f | inverted f | ifa
30 Chip antenna
30 Quad antenna | cubical quad
30 Ferrite rod antenna | loopstick | ferrite rod
30 Rhombic antenna | rhombic
30 Fractal antenna
30 Cassegrain antenna | cassegrain
30 Spiral antenna | archimedean spiral
30 Beverage antenna | beverage | wave antenna
30 Vivaldi antenna | vivaldi | tapered slot
30 Corner reflector
30 Lens antenna | luneburg lens | luneburg
30 Moxon antenna | moxon rectangle | moxon
30 Turnstile antenna | turnstile
30 Quadrifilar helix | qha
60 G5RV
60 Batwing antenna | batwing | superturnstile
60 Windom antenna | windom | ocf dipole | off center fed dipole
60 Metamaterial antenna
60 Leaky wave antenna | leaky feeder
60 Halo antenna | halo
60 Dielectric resonator antenna | dra
60 Adcock antenna | adcock
60 Reflectarray
60 T-antenna | flat top antenna
60 Umbrella antenna
60 Hentenna
60 Lindenblad antenna | lindenblad
60 Sterba curtain | sterba
60 Bruce array
60 Plasma antenna
85 Lazy H
85 Alexanderson antenna | multiple tuned antenna
85 Bobtail curtain | bobtail
100 Wullenweber | circularly disposed antenna array | cdaa | elephant cage
`);

export const rfConnectors = p("rf-connectors", "Name an RF or coax connector", `
10 SMA
10 BNC
10 N-type | n connector | type n
10 F-type | f connector | type f
15 U.FL | ufl | ipex | ipx | mhf
15 RP-SMA | reverse polarity sma | rpsma
15 TNC
15 SMB
15 MCX
15 MMCX
15 UHF connector | pl-259 | so-239
15 SMC
15 7/16 DIN | 7-16 din | din 7/16
30 QMA
30 2.92 mm | k connector | 2.92mm | k-type
30 4.3-10 | 4.3/10
30 3.5 mm | 3.5mm connector | 3.5mm
30 2.4 mm | 2.4mm
30 LEMO | lemo connector
30 1.85 mm | v connector | 1.85mm
30 SMP | gpo
30 SSMA
30 1.0 mm | w connector | 1mm connector | 1.0mm
30 SSMB
30 SHV
30 MHV
30 Twinax | twinaxial
30 APC-7 | 7mm connector
30 Triax | triaxial | triaxial bnc
30 Mini-UHF
30 C connector | type c | c-type
30 SMPM | gppo | mini smp
30 Belling-Lee | iec 169-2 | pal connector | iec 61169-2
60 W.FL | wfl
60 HD-BNC | mini bnc | mini-bnc
60 1.6/5.6 | 1.6/5.6 connector
60 NEX10
60 BMA
60 QLA
60 H.FL | hfl
60 EIA flange | eia flange connector
60 HN connector | type hn
100 GR874 | gr-874 | general radio connector
`);

export const transforms = p("transforms", "Name a transform used in signal processing", `
10 Fourier transform | fourier | ft
10 Laplace transform | laplace
10 Z-transform | z transform
10 FFT | fast fourier transform
15 DFT | discrete fourier transform
15 Wavelet transform | wavelet | cwt | dwt | discrete wavelet transform
15 Hilbert transform | hilbert
15 DTFT | discrete time fourier transform
15 STFT | short time fourier transform | spectrogram
15 DCT | discrete cosine transform
15 Bilinear transform | tustin | tustin's method
15 Park transform | dq transform | dq0 | park
15 Clarke transform | alpha beta transform | αβ transform | clarke
15 Haar transform | haar
30 Karhunen-Loève transform | klt | pca | principal component analysis
30 Goertzel algorithm | goertzel
30 Gabor transform | gabor
30 Hough transform | hough
30 Chirp Z-transform | czt | bluestein
30 Walsh-Hadamard transform | walsh hadamard | walsh transform | hadamard transform | wht
30 Radon transform | radon
30 Mellin transform | mellin
30 Cepstrum | cepstral analysis
30 Hartley transform | hartley
30 Wigner-Ville distribution | wigner ville | wigner distribution
30 Constant-Q transform | cqt | constant q
30 MDCT | modified discrete cosine transform
30 Fractional Fourier transform | frft
30 Hankel transform | hankel | fourier bessel transform
30 Fortescue transform | symmetrical components | fortescue
30 Hilbert-Huang transform | hht | empirical mode decomposition | emd
30 Legendre transform
30 Number theoretic transform | ntt
30 S transform | stockwell transform | stockwell
60 Two-sided Laplace transform | bilateral laplace
60 Abel transform | abel
60 Zak transform | zak | gelfand mapping
60 Matched Z-transform | pole zero mapping | matched z
60 Curvelet transform | curvelet
60 Advanced Z-transform | modified z transform
60 Chirplet transform | chirplet
60 Starred transform | star transform
60 Contourlet transform | contourlet
60 Weierstrass transform | weierstrass
100 Kravchuk transform | krawtchouk transform | kravchuk
`);

export const wireless = p("wireless", "Name a wireless standard or technology", `
10 Wi-Fi | wifi | 802.11 | ieee 802.11 | wlan
10 Bluetooth
10 5G | 5g nr
10 LTE | 4g | 4g lte
15 Bluetooth Low Energy | ble | bluetooth le | bluetooth smart
15 NFC | near field communication
15 Zigbee
15 LoRa | lorawan
15 RFID
15 GSM | 2g
15 Z-Wave | zwave
15 Thread
15 UWB | ultra wideband | ultra-wideband
15 UMTS | 3g | wcdma | w-cdma
30 GPS | gnss
30 WiMAX | 802.16
30 CDMA2000 | cdma | is-95 | ev-do
30 Sigfox
30 NB-IoT | narrowband iot
30 DECT
30 LTE-M | cat-m1 | lte cat m
30 Matter
30 ANT+ | ant | ant plus
30 Wi-Fi HaLow | 802.11ah | halow
30 TETRA
30 DMR | digital mobile radio
30 EnOcean
30 P25 | project 25 | apco 25
30 Wi-SUN | wisun
30 AMPS | 1g | advanced mobile phone system
30 DASH7 | dash 7
30 6LoWPAN
30 iDEN
30 Insteon
60 WirelessHART | wireless hart
60 IrDA | infrared data association
60 Weightless
60 Li-Fi | lifi
60 TACS
60 DVB-T | dvb
60 NMT | nordic mobile telephone
60 ATSC
60 PHS | personal handy-phone system
60 DAB | digital audio broadcasting
60 HIPERLAN | hiperlan2
60 WiGig | 802.11ad | 60 ghz wifi
60 ISA100.11a | isa100
60 Mobitex
60 CT2 | cordless telephone 2
85 IMTS | improved mobile telephone service
85 MTS | mobile telephone service
85 Ricochet | metricom ricochet | metricom
100 ARDIS
`);

export const units = p("units", "Name a unit used in electrical engineering", `
10 Volt | v
10 Ampere | amp | a
10 Ohm | ω
10 Watt | w
15 Farad | f
15 Henry | h
15 Coulomb | c
15 Hertz | hz
15 Joule | j
15 Tesla | t
15 Weber | wb
15 Siemens | s | mho
15 Decibel | db
15 Kilowatt-hour | kwh | kilowatt hour
30 Ampere-hour | ah | mah | amp hour | milliamp hour
30 Electronvolt | ev | electron volt
30 Volt-ampere | va | kva
30 Gauss
30 VAR | volt ampere reactive | kvar
30 dBm
30 Baud | bd
30 Bit per second | bps | bits per second
30 Watt-hour | wh | watt hour
30 dBi
30 Bel
30 Ohm-meter | ohm metre | ohm meter
30 Oersted | oe
30 Volt per meter | v/m | volt per metre
30 Maxwell | mx
30 dBc
30 Neper | np
30 dBu
30 Siemens per meter | s/m | siemens per metre
30 Ampere-turn | at | amp turn
60 Farad per meter | f/m | farad per metre
60 Henry per meter | h/m | henry per metre
60 Faraday
60 dBV
60 Gilbert | gb
60 Circular mil | kcmil | mcm | cmil
60 Statcoulomb | franklin | esu of charge
60 Statvolt
60 Debye
60 Abampere | biot
60 Abvolt
60 Gamma
60 Abohm
60 Statohm
60 Abfarad
85 Abhenry
85 Daraf
85 Siemens mercury unit | mercury unit
100 Jacobi | jacobi unit
`);

export const laws = p("laws", "Name a law, theorem or principle of EE", `
10 Ohm's law | ohm | ohms law
10 Kirchhoff's current law | kcl | kirchhoffs current law | kirchhoff's first law | junction rule
10 Kirchhoff's voltage law | kvl | kirchhoffs voltage law | kirchhoff's second law | loop rule
10 Thévenin's theorem | thevenin | thevenin's theorem | thevenins theorem
15 Norton's theorem | norton | nortons theorem
15 Superposition theorem | superposition
15 Faraday's law | faraday's law of induction | faraday | faradays law
15 Lenz's law | lenz | lenzs law
15 Coulomb's law | coulomb | coulombs law
15 Maxwell's equations | maxwell | maxwells equations
15 Ampère's law | ampere's law | amperes law | ampere's circuital law
15 Gauss's law | gauss law | gauss
15 Joule's law | joule heating | joules first law | joules law
15 Biot-Savart law | biot savart
30 Maximum power transfer theorem | max power transfer | maximum power transfer | jacobi's law
30 Nyquist-Shannon sampling theorem | nyquist theorem | sampling theorem | nyquist shannon | nyquist
30 Shannon-Hartley theorem | shannon hartley | channel capacity | shannon limit
30 Millman's theorem | millman
30 Miller's theorem | miller effect | miller
30 Fleming's left-hand rule | left hand rule | flemings left hand rule
30 Reciprocity theorem | reciprocity
30 Fleming's right-hand rule | right hand rule | flemings right hand rule
30 Moore's law | moores law
30 Tellegen's theorem | tellegen
30 Lorentz force law | lorentz force | lorentz
30 Y-Δ transform | delta wye | star delta transformation | wye delta | kennelly | y delta transform | star mesh
30 Substitution theorem | substitution
30 Poynting's theorem | poynting
30 Compensation theorem | compensation
30 Barkhausen criterion | barkhausen
30 Wiedemann-Franz law | wiedemann franz
30 Nyquist stability criterion | nyquist criterion
30 Routh-Hurwitz criterion | routh hurwitz | routh array
30 Faraday's laws of electrolysis | electrolysis law
60 Hopkinson's law | magnetic ohm's law | hopkinson
60 Earnshaw's theorem | earnshaw
60 Paschen's law | paschen
60 Rosen's theorem | rosen
60 Foster's reactance theorem | foster's theorem | foster
60 Blondel's theorem | blondel
60 Bode's sensitivity integral | bode integral
60 Kramers-Kronig relations | kramers kronig
60 Richardson's law | richardson dushman
60 Child-Langmuir law | child's law | three halves power law
60 Steinmetz equation | steinmetz
60 Bode-Fano limit | bode fano | fano limit
60 Peek's law | peek
60 Bartlett's bisection theorem | bartlett bisection | bartlett
100 Bott-Duffin theorem | bott duffin
`);

export const pioneers = p("pioneers", "Name a pioneer of electricity or electronics", `
10 Nikola Tesla | tesla
10 Thomas Edison | edison
10 Michael Faraday | faraday
10 Benjamin Franklin | franklin
15 James Clerk Maxwell | maxwell
15 Georg Ohm | ohm
15 Alessandro Volta | volta
15 André-Marie Ampère | ampere
15 George Westinghouse | westinghouse
15 Heinrich Hertz | hertz
15 Guglielmo Marconi | marconi
15 Gustav Kirchhoff | kirchhoff
15 Joseph Henry | henry
15 Charles-Augustin de Coulomb | coulomb
30 Claude Shannon | shannon
30 Alexander Graham Bell | graham bell | bell
30 William Shockley | shockley
30 John Bardeen | bardeen
30 Walter Brattain | brattain
30 Jack Kilby | kilby
30 Robert Noyce | noyce
30 Oliver Heaviside | heaviside
30 Charles Steinmetz | steinmetz
30 Lee de Forest | de forest | deforest
30 Hans Christian Ørsted | oersted | orsted | hans christian oersted
30 Luigi Galvani | galvani
30 Wilhelm Weber | weber
30 Werner von Siemens | siemens
30 Harry Nyquist | nyquist
30 Hedy Lamarr | lamarr
30 Hendrik Bode | bode
30 Léon Charles Thévenin | thevenin
30 John Ambrose Fleming | fleming
30 Edwin Armstrong | armstrong
30 Reginald Fessenden | fessenden
60 Jagadish Chandra Bose | j c bose | jc bose | jagadish bose
60 Gordon Moore | moore
60 Edward Norton | norton
60 Federico Faggin | faggin
60 Ted Hoff | hoff | marcian hoff
60 Lynn Conway | conway
60 Mohamed Atalla | atalla | martin atalla
60 Carver Mead | mead
60 Dawon Kahng | kahng
60 Edith Clarke | clarke
60 William Gilbert | gilbert
60 Stephen Gray | gray
60 Otto von Guericke | guericke
60 William Sturgeon | sturgeon
60 Bob Widlar | widlar
60 Pieter van Musschenbroek | musschenbroek
60 Harold Black | harold stephen black
60 Zénobe Gramme | gramme
60 Ewald Georg von Kleist | kleist
60 Galileo Ferraris | ferraris
60 Alan Blumlein | blumlein
60 Ányos Jedlik | jedlik
60 Hippolyte Pixii | pixii
85 Julius Lilienfeld | lilienfeld
85 Paul Eisler | eisler
85 Mikhail Dolivo-Dobrovolsky | dolivo dobrovolsky | dolivo-dobrovolsky
85 Oskar Heil | heil
85 Heinrich Welker | welker
85 Herbert Mataré | matare
85 Francis Ronalds | ronalds
100 Prokop Diviš | divis | procopius divisch
`);

export const instruments = p("instruments", "Name a test or measurement instrument", `
10 Multimeter | dmm | digital multimeter | avometer
10 Oscilloscope | scope | dso | cro
10 Bench power supply | power supply | psu | bench supply
10 Function generator | signal generator | waveform generator | awg | arbitrary waveform generator
15 Spectrum analyzer | spectrum analyser
15 Logic analyzer | logic analyser
15 Clamp meter | clamp on ammeter | current clamp
15 LCR meter | lcr bridge
15 Voltmeter
15 Ammeter
15 Ohmmeter
15 Wattmeter
15 Network analyzer | vna | vector network analyzer | network analyser
15 Megger | insulation tester | megohmmeter | insulation resistance tester
30 Frequency counter | counter
30 Galvanometer
30 Wheatstone bridge | wheatstone
30 Thermal camera | thermal imager | ir camera
30 Electronic load | dc load
30 Logic probe
30 Continuity tester | continuity
30 Non-contact voltage tester | voltage pen | ncv | voltage tester
30 Electroscope | gold leaf electroscope
30 Electrometer
30 Kelvin bridge | kelvin double bridge
30 Source measure unit | smu | sourcemeter
30 Curve tracer | transistor curve tracer
30 TDR | time domain reflectometer
30 Maxwell bridge
30 Power analyzer
30 OTDR | optical tdr
30 Hipot tester | hipot | dielectric withstand tester
30 Schering bridge
30 Earth ground tester | ground resistance tester
60 Wien bridge
60 Power quality analyzer
60 Hay bridge | hays bridge
60 Protocol analyzer
60 Signal analyzer
60 Noise figure analyzer
60 Anderson bridge
60 Phase noise analyzer
60 Real-time spectrum analyzer | rtsa
60 Picoammeter
60 Nanovoltmeter
60 Magnetometer | fluxgate magnetometer | gaussmeter | teslameter
60 Lock-in amplifier | lock in
60 Distortion analyzer | thd analyzer
60 Vectorscope
60 Grid dip oscillator | grid dip meter | dip meter | gdo
60 Waveform monitor
60 Boxcar averager | boxcar integrator
60 Electrodynamometer
60 Q meter
60 Measuring potentiometer | potentiometer
85 Ballistic galvanometer
85 Tangent galvanometer
85 Vibration galvanometer
100 Duddell oscillograph | duddell | moving coil oscillograph
`);

export const semiconductors = p("semiconductors", "Name a semiconductor material", `
10 Silicon | si
10 Germanium | ge
10 Gallium arsenide | gaas
10 Gallium nitride | gan
15 Silicon carbide | sic | carborundum
15 Perovskite | metal halide perovskite
15 Indium phosphide | inp
15 Silicon-germanium | sige
15 Diamond
15 Gallium phosphide | gap
15 Indium gallium arsenide | ingaas
15 Indium gallium nitride | ingan
15 Aluminum gallium arsenide | algaas | aluminium gallium arsenide
15 Indium antimonide | insb
30 Indium arsenide | inas
30 Zinc oxide | zno
30 Gallium oxide | ga2o3
30 Cadmium telluride | cdte
30 CIGS | copper indium gallium selenide
30 Cadmium sulfide | cds
30 Zinc selenide | znse
30 Zinc sulfide | zns
30 Molybdenum disulfide | mos2
30 Cadmium selenide | cdse
30 Lead sulfide | pbs | galena
30 Mercury cadmium telluride | hgcdte | mct
30 Aluminum nitride | aln | aluminium nitride
30 Lead telluride | pbte
30 Boron nitride | hbn | cubic boron nitride
30 Gallium antimonide | gasb
30 Aluminum arsenide | alas | aluminium arsenide
30 Indium nitride | inn
30 Selenium | se
60 Tellurium | te
60 Cuprous oxide | copper oxide | cu2o
60 Tungsten diselenide | wse2
60 Bismuth telluride | bi2te3
60 Indium tin oxide | ito
60 IGZO | indium gallium zinc oxide
60 Pentacene
60 Black phosphorus | phosphorene
60 P3HT | polythiophene
60 Boron
60 Zinc telluride | znte
60 Aluminum antimonide | alsb | aluminium antimonide
60 CZTS | copper zinc tin sulfide | kesterite
60 Gallium selenide | gase
60 Magnesium silicide | mg2si
60 Iron disilicide | fesi2 | beta iron disilicide
85 Cuprous chloride | cucl
85 Cadmium germanium arsenide | cdgeas2
100 Zinc germanium phosphide | zngep2
`);

