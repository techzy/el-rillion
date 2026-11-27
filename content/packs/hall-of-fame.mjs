import { p } from "../dsl.mjs";
import { units, laws, pioneers, instruments, semiconductors } from "../legacy.mjs";

const companies = p("hof-companies", "Name an electronics or electrical company", `
10 Texas Instruments | ti
10 Intel
10 Samsung
10 Siemens
15 Analog Devices | adi
15 NVIDIA
15 AMD | advanced micro devices
15 Qualcomm
15 TSMC
15 General Electric | ge
15 Westinghouse
15 Tesla
30 Infineon
30 STMicroelectronics | st | stmicro
30 NXP | nxp semiconductors | philips semiconductors
30 Microchip | microchip technology | atmel
30 Renesas
30 Broadcom
30 ABB
30 Schneider Electric | schneider
30 Tektronix | tek
30 Keysight | agilent | hewlett packard | hp
30 Rohde & Schwarz | rohde and schwarz | r&s
30 Fluke
30 National Instruments | ni
30 Maxim Integrated | maxim
30 Linear Technology | ltc | linear tech
30 onsemi | on semiconductor | on semi
30 Fairchild Semiconductor | fairchild
30 Xilinx
30 Altera
30 Espressif
30 Nordic Semiconductor | nordic
30 Raspberry Pi | raspberry pi foundation
30 Arduino
30 Eaton
30 Hitachi
30 Panasonic
30 Murata
30 TDK
30 Vishay
30 Digi-Key | digikey
30 Mouser
60 Littelfuse
60 Bourns
60 Lattice Semiconductor | lattice
60 Silicon Labs | silabs
60 Cypress Semiconductor | cypress
60 Microsemi
60 Skyworks
60 Qorvo
60 Wolfspeed | cree
60 Navitas
60 Monolithic Power Systems | mps
60 Power Integrations
60 Vicor
60 Molex
60 TE Connectivity | te | tyco
60 Amphenol
60 KEMET
60 Nichicon
60 Rubycon
60 Würth Elektronik | wurth | würth
60 Hammond Manufacturing | hammond
60 Nortel | northern telecom
60 Celestica
60 GaN Systems
85 Signetics
85 National Semiconductor | national
85 Burr-Brown | burr brown
85 Siliconix
85 Mostek
85 Zilog
85 Sprague
85 RCA | radio corporation of america
85 Shockley Semiconductor Laboratory | shockley semiconductor
85 Philbrick Researches | philbrick
85 Teledyne
85 Intersil | harris semiconductor
85 Western Electric
100 Amelco
`);

const symbols = p("hof-symbols", "Name a symbol you'd see on a schematic", `
10 Resistor
10 Capacitor
10 Ground | ground symbol
10 Battery
10 LED
15 Diode
15 Inductor | coil
15 Transistor
15 Switch
15 Voltage source | dc source
15 Op-amp | operational amplifier | triangle
15 Lamp | light bulb
15 Fuse
15 Speaker | loudspeaker
15 Wire | net
30 Transformer
30 Potentiometer | pot
30 Current source
30 AC source | sine source
30 Zener diode | zener
30 Junction dot | dot | node
30 Chassis ground | earth ground | signal ground
30 Antenna
30 Crystal
30 Relay
30 Motor
30 Logic gate | and gate | nand gate
30 Net label | label
30 Power rail | vcc | vdd | power flag
30 Electrolytic capacitor | polarized capacitor
30 MOSFET
30 Microphone
30 Buzzer | piezo
30 Photodiode
30 Meter | voltmeter | ammeter
60 Test point
60 No-connect | no connect | nc
60 Off-page connector | off sheet connector | hierarchical port
60 Bus | bus entry
60 Thermistor
60 Varistor | mov
60 Schottky diode
60 Optocoupler | optoisolator
60 Ferrite bead
60 Variable capacitor | trimmer
60 Thyristor | scr
60 TRIAC
60 Spark gap
60 Jumper | solder jumper
60 Cable shield | shield
60 Dependent source | controlled source | vcvs | cccs | ccvs
60 Schmitt trigger symbol | hysteresis symbol
60 Wire crossover hop | crossover | hop
85 Tunnel diode
85 Varactor
85 Unijunction transistor | ujt
85 DIAC
85 Nullator
85 Norator
100 Nullor
`);

const textbooks = p("hof-textbooks", "Name a classic EE textbook or reference", `
10 The Art of Electronics | art of electronics | horowitz and hill | aoe
10 Microelectronic Circuits | sedra smith | sedra and smith | sedra/smith
15 Engineering Circuit Analysis | hayt and kemmerly | hayt kemmerly
15 Electric Circuits | nilsson and riedel | nilsson riedel
15 Introduction to Electrodynamics | griffiths
15 Signals and Systems | oppenheim | oppenheim willsky
15 Design of Analog CMOS Integrated Circuits | razavi
15 Computer Organization and Design | patterson and hennessy | patterson hennessy
15 Digital Design | morris mano | mano
15 Microwave Engineering | pozar
30 Analysis and Design of Analog Integrated Circuits | gray and meyer | gray meyer
30 Discrete-Time Signal Processing | oppenheim schafer | oppenheim and schafer
30 Engineering Electromagnetics | hayt buck | hayt and buck
30 Electronic Devices and Circuit Theory | boylestad
30 Electronic Devices | floyd | thomas floyd
30 Modern Control Engineering | ogata
30 Feedback Control of Dynamic Systems | franklin powell
30 Antenna Theory | balanis
30 Antennas | kraus
30 Power System Analysis | grainger stevenson | grainger and stevenson
30 Electric Machinery Fundamentals | chapman
30 Power Electronics | mohan undeland robbins | mohan
30 Fundamentals of Power Electronics | erickson | erickson maksimovic
30 Communication Systems | haykin
30 Digital Communications | proakis
30 CMOS VLSI Design | weste and harris | weste harris
30 Digital Integrated Circuits | rabaey
30 Physics of Semiconductor Devices | sze
30 Solid State Electronic Devices | streetman
30 The ARRL Handbook | arrl handbook
30 Linear Systems and Signals | lathi
30 Fundamentals of Applied Electromagnetics | ulaby
30 Elements of Electromagnetics | sadiku
30 Field and Wave Electromagnetics | cheng | david cheng
30 Fundamentals of Electric Circuits | alexander sadiku | alexander and sadiku
60 High-Speed Digital Design | black magic | johnson and graham | handbook of black magic
60 Troubleshooting Analog Circuits | pease
60 Electromagnetic Compatibility Engineering | ott | henry ott | noise reduction techniques
60 The Design of CMOS Radio-Frequency Integrated Circuits | thomas lee
60 Integrated Electronics | millman | millman halkias | millman grabel
60 Electronic Principles | malvino
60 Digital Design and Computer Architecture | harris and harris
60 Computer Architecture: A Quantitative Approach | hennessy patterson | quantitative approach
60 Op Amps for Everyone | mancini
60 Practical Electronics for Inventors | scherz
60 Getting Started in Electronics | forrest mims | mims
60 Radiotron Designer's Handbook | radiotron | langford-smith
60 Reference Data for Engineers | itt reference data
85 Network Analysis and Feedback Amplifier Design | bode's book
85 Radio Engineers' Handbook | terman
85 Halbleiter-Schaltungstechnik | tietze schenk | tietze and schenk
85 MIT Radiation Laboratory Series | rad lab series | radiation lab series
85 Communication Networks | guillemin
100 A Treatise on Electricity and Magnetism | maxwell's treatise | treatise
`);

const standards = p("hof-standards", "Name an electrical standard, code or certification", `
10 IEEE 802.11 | 802.11
10 UL | ul listed | underwriters laboratories
10 CE marking | ce mark | ce
15 CSA | csa certified
15 National Electrical Code | nec | nfpa 70
15 Canadian Electrical Code | cec | csa c22.1
15 RoHS
15 IEEE 754
15 IEEE 802.3 | 802.3
15 FCC Part 15 | fcc | part 15
30 IPC-A-610 | ipc 610
30 IPC-2221 | ipc 2221
30 JEDEC
30 IEC 60601 | 60601
30 IEC 62368 | 62368
30 IEC 61131 | iec 61131-3
30 NFPA 70E | 70e
30 IEEE 1584 | arc flash standard
30 ISO 26262
30 IEEE 1149.1 | jtag standard
30 USB specification | usb-if
30 Qi | qi standard
30 Energy Star
30 REACH
30 WEEE
30 IP rating | ip67 | ip68 | ingress protection
30 NEMA enclosure rating | nema 4 | nema 4x
30 MIL-STD-810 | mil spec 810
30 IEC 61850
30 IEEE 1547
30 IEEE 519
30 CISPR 32 | cispr 22 | cispr
60 MIL-STD-883
60 MIL-STD-461
60 DO-160
60 DO-254
60 IEC 61508 | sil
60 IEC 60950 | 60950
60 IEC 61000 | iec 61000-4-2
60 ANSI C84.1 | c84.1
60 IEEE C37 | c37
60 IEEE 1394
60 IEEE 488 | gpib
60 AEC-Q100 | aec q100
60 JESD22
60 J-STD-001 | ipc j-std-001
60 UL 94 | ul94 | v-0
60 IEC 60068
60 EN 300 328 | etsi en 300 328
60 ISED | industry canada | rss-247
60 PSE mark | pse
60 CCC | china compulsory certificate
60 UKCA
85 VDE
85 TÜV | tuv
85 BS 7671 | iet wiring regulations
85 AS/NZS 3000 | wiring rules
85 IEEE 315 | schematic symbols standard
85 IEC 60617
85 IEEE 91 | ansi/ieee std 91
100 IEC 60062
`);

const effects = p("hof-effects", "Name a physical effect used in electronics", `
10 Photoelectric effect | photoelectric
10 Piezoelectric effect | piezoelectric | piezoelectricity
10 Hall effect
15 Seebeck effect | seebeck | thermoelectric effect
15 Peltier effect | peltier
15 Quantum tunneling | tunneling | tunnel effect
15 Skin effect
15 Doppler effect | doppler
15 Electromagnetic induction | induction
15 Triboelectric effect | static electricity | triboelectricity
30 Thomson effect
30 Thermionic emission | edison effect
30 Avalanche breakdown | avalanche effect
30 Zener breakdown | zener effect
30 Miller effect
30 Proximity effect
30 Magnetoresistance
30 Giant magnetoresistance | gmr
30 Superconductivity
30 Josephson effect | josephson junction
30 Meissner effect
30 Electroluminescence
30 Photovoltaic effect
30 Pyroelectric effect | pyroelectricity
30 Corona discharge | corona
30 Early effect | base width modulation
30 Body effect
30 Magnetostriction
60 Gunn effect
60 Kirk effect
60 Faraday effect | faraday rotation
60 Kerr effect
60 Pockels effect
60 Zeeman effect
60 Stark effect
60 Barkhausen effect
60 Nernst effect
60 Ettingshausen effect
60 Wiedemann effect
60 Villari effect
60 Quantum Hall effect
60 Coulomb blockade
60 Tunnel magnetoresistance | tmr
60 Spin Hall effect
60 Franz-Keldysh effect | franz keldysh
60 Short-channel effect | short channel
85 Matteucci effect
85 Hopkinson effect
85 Shubnikov-de Haas effect | shubnikov de haas
85 Aharonov-Bohm effect | aharonov bohm
85 Purcell effect
85 Kondo effect
85 Malter effect
100 Johnsen-Rahbek effect | johnsen rahbek
`);

const bellLabs = p("hof-bell-labs", "Name an invention or discovery from Bell Labs", `
10 Transistor | point contact transistor
10 Unix
10 C | c language | c programming language
15 Information theory
15 Solar cell | photovoltaic cell | silicon solar cell
15 Laser
15 CCD | charge coupled device
15 Cellular network | cellular telephony
15 C++
30 MOSFET
30 Cosmic microwave background | cmb
30 Radio astronomy | jansky
30 Negative feedback amplifier | feedback amplifier
30 Hamming code | error correcting code
30 Vocoder | voder
30 Telstar | communications satellite
30 Touch-tone dialing | dtmf | touch tone
30 Sampling theorem | nyquist sampling theorem
30 Fractional quantum Hall effect | fractional quantum hall
30 Molecular beam epitaxy | mbe
30 Electret microphone
30 Stereo recording | stereophonic sound
30 Sound film | talkies | vitaphone
30 Quartz clock
30 BLAST | mimo | bell labs layered space-time
30 Digital signal processor | dsp | dsp-1
30 Shor's algorithm | shor
60 Optical tweezers
60 Davisson-Germer experiment | electron diffraction
60 Pulse-code modulation | pcm
60 Echo cancellation | echo canceller
60 Zone refining | zone melting
60 Oxide masking | silicon dioxide masking
60 Junction transistor | bipolar junction transistor
60 AWK
60 Plan 9
60 S language | s
60 MUSIC-N | music n | music i
60 Quantum cascade laser
60 Erbium-doped fiber amplifier | edfa
60 Electronic switching system | 1ess | ess
85 Smith chart
85 Rhombic antenna
85 Holmdel horn antenna | horn antenna
85 Picturephone
100 μ-law | mu-law | u-law | mu law companding
`);

const youtube = p("hof-youtube", "Name an electronics YouTube channel", `
10 EEVblog | dave jones
10 Ben Eater
10 ElectroBOOM | mehdi sadaghdar
15 GreatScott! | greatscott
15 bigclivedotcom | big clive
15 Andreas Spiess
15 Applied Science | ben krasnow
15 Technology Connections
15 Afrotechmods
30 Marco Reps
30 CuriousMarc
30 The Signal Path | shahriar shahramian
30 w2aew | alan wolke
30 Phil's Lab | phils lab
30 Robert Feranec | fedevel
30 Mr Carlson's Lab | mr carlsons lab
30 Diode Gone Wild
30 bitluni | bitluni's lab
30 Strange Parts | scotty allen
30 The 8-Bit Guy | 8 bit guy
30 Ken Shirriff | righto
30 Sam Zeloof
30 Electronoobs
30 DroneBot Workshop | dronebot
30 Paul McWhorter | mcwhorter
30 Adafruit
30 SparkFun
30 Jeri Ellsworth
30 StyroPyro
30 Tech Ingredients
30 Plasma Channel
30 Unexpected Maker
60 Learn Electronics Repair
60 TronicsFix
60 Shango066 | shango
60 Kerry Wong
60 mikeselectricstuff | mike's electric stuff
60 IMSAI Guy | imsaiguy
60 Usagi Electric
60 Adrian's Digital Basement | adrian black
60 Jeff Geerling
60 TheHWcave | hwcave
60 Branch Education
60 The Engineering Mindset
85 Fran Blanche | frances blanche
85 Breaking Taps
85 Tech Tangents
100 RimstarOrg | rimstar
`);

const jobs = p("hof-jobs", "Name an electrical engineering job or specialty", `
10 Power engineer | power systems engineer
10 Electronics engineer
10 Electrician
10 Hardware engineer
15 Embedded engineer | embedded systems engineer | firmware engineer
15 Controls engineer | control systems engineer
15 RF engineer | radio frequency engineer
15 Analog designer | analog engineer | analog ic designer
15 Digital designer | digital design engineer
15 Test engineer
15 PCB designer | layout engineer | pcb layout
15 Electrical designer
30 FPGA engineer
30 ASIC engineer | chip designer | ic designer
30 Verification engineer | design verification
30 Applications engineer | apps engineer
30 Field application engineer | fae
30 Instrumentation engineer
30 Protection engineer | protection and control
30 Substation engineer
30 Signal integrity engineer | si engineer
30 EMC engineer | emi engineer | compliance engineer
30 Systems engineer
30 Reliability engineer
30 Validation engineer
30 Product engineer
30 Lineworker | lineman | powerline technician
30 Power electronics engineer
30 Antenna engineer
30 Telecommunications engineer | telecom engineer
30 Robotics engineer
30 Avionics engineer
30 Biomedical engineer | clinical engineer
30 Process engineer | semiconductor process engineer
30 Optical engineer | photonics engineer
60 DFT engineer | design for test
60 Physical design engineer | place and route
60 Mixed-signal designer | mixed signal
60 Characterization engineer
60 Failure analysis engineer | fa engineer
60 Yield engineer
60 Packaging engineer
60 Power integrity engineer | pi engineer
60 Transmission planner | grid planner | system planner
60 Distribution engineer
60 Metering engineer
60 Commissioning engineer
60 SCADA engineer
60 Battery engineer | bms engineer
60 Electric machine designer | motor designer
60 Lighting designer
60 Audio engineer | acoustic engineer
60 Patent agent | patent engineer
85 Mask designer | mask layout
85 Relay technician | relay tech
85 Live-line worker | barehand lineman | hot-stick lineman
85 Cable splicer
85 Electrical estimator
100 Cathodic protection engineer | corrosion engineer
`);

const colorCode = p("hof-color-code", "Name a colour in the resistor colour code", `
10 Red
10 Black
10 Brown
15 Orange
15 Yellow
15 Green
15 Blue
15 Violet | purple
15 Grey | gray
15 White
30 Gold
30 Silver
60 No band | none | no color | no colour | blank
100 Pink
`);

export default {
  id: "hall-of-fame",
  name: "Hall of Fame",
  description: "Units, laws, legends, companies, books and the culture of EE.",
  chapters: [
    [units, laws, pioneers, instruments, semiconductors, companies, symbols],
    [textbooks, standards, effects, bellLabs, youtube, jobs, colorCode],
  ],
};
