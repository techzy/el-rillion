import { p } from "../dsl.mjs";
import { logicElements, buses, mcus, memory, eda } from "../legacy.mjs";

const isa = p("bb-isa", "Name a CPU architecture or instruction set", `
10 x86 | intel x86 | ia-32
10 ARM | aarch64 | arm64 | armv8
10 RISC-V | riscv
15 x86-64 | amd64 | x64 | intel 64
15 MIPS
15 PowerPC | power isa | ppc
15 AVR
15 6502
15 Z80
30 SPARC
30 68000 | m68k | 68k | motorola 68000
30 8051 | mcs-51
30 PIC
30 Thumb | thumb-2
30 Itanium | ia-64
30 Alpha | dec alpha
30 PA-RISC | pa risc
30 VAX
30 PDP-11
30 System/360 | ibm 360 | s/360 | z/architecture
30 SuperH | sh-4
30 Xtensa
30 MSP430
60 OpenRISC | or1k
60 LoongArch
60 Hexagon | qualcomm hexagon
60 Elbrus | e2k
60 TriCore
60 ARC | synopsys arc
60 Transputer | inmos transputer
60 CDC 6600
60 PDP-8
60 8080 | intel 8080
60 6809
60 RCA 1802 | cosmac | 1802
85 Clipper | intergraph clipper
85 i860 | intel i860
85 iAPX 432 | i432
85 Am29000 | 29k | amd 29000
85 NS32000 | ns32k
85 MMIX
85 Mill | mill architecture
100 Setun
`);

const encoding = p("bb-encoding", "Name a number system or binary encoding", `
10 Binary | base 2
10 Hexadecimal | hex | base 16
10 Decimal | base 10
15 Octal | base 8
15 ASCII
15 Two's complement | twos complement
15 BCD | binary coded decimal
15 Gray code | gray | reflected binary
15 Floating point | ieee 754 | float
15 Unicode | utf-8 | utf8
30 One's complement | ones complement
30 Sign-magnitude | sign magnitude | signed magnitude
30 Fixed point | q format
30 One-hot | one hot encoding
30 Manchester encoding | manchester
30 NRZ | non return to zero
30 Parity | parity bit
30 Hamming code | hamming
30 Base64
30 Excess-3 | xs-3 | excess 3
30 EBCDIC
30 Endianness | big endian | little endian
60 8b/10b | 8b10b
60 Thermometer code | unary
60 Bfloat16 | bf16
60 Half precision | fp16 | float16
60 NRZI
60 Offset binary | biased exponent | excess-k
60 Johnson code | johnson counter
60 CRC | cyclic redundancy check
60 Reed-Solomon | reed solomon
60 64b/66b | 64b66b
60 PAM4
60 Huffman coding | huffman
85 Balanced ternary
85 Densely packed decimal | dpd
85 Chen-Ho encoding | chen ho
85 Aiken code | 2421 code
85 Posit | unum
85 Baudot code | baudot | ita2
85 Negabinary | base negative two
100 Fibonacci coding | zeckendorf | zeckendorf representation
`);

const cpu = p("bb-cpu", "Name a part of a CPU", `
10 ALU | arithmetic logic unit
10 Register | registers
10 Cache | l1 cache | l2 cache | l3 cache
10 Control unit
15 Program counter | pc | instruction pointer
15 Clock | clock generator
15 Core
15 FPU | floating point unit
15 Instruction decoder | decoder
15 Accumulator
15 Instruction register | ir
30 Stack pointer | sp
30 Status register | flags register | flags
30 MMU | memory management unit
30 Pipeline
30 Branch predictor | branch prediction
30 Bus interface unit | bus interface
30 Register file
30 Memory address register | mar
30 Memory data register | mdr | memory buffer register
30 Load-store unit | lsu | load store unit
30 Execution unit
30 Interrupt controller | apic | nvic
30 TLB | translation lookaside buffer
60 Reorder buffer | rob
60 Reservation station
60 Scheduler | issue queue
60 Prefetcher | prefetch unit
60 Microcode ROM | microcode
60 Barrel shifter
60 Hardware multiplier | multiplier
60 SIMD unit | vector unit | neon
60 Store buffer | write buffer
60 Return stack buffer | return address stack
60 Branch target buffer | btb
60 Memory controller | integrated memory controller
60 Uncore
85 Register alias table | register renaming | rat
85 Loop stream detector
85 Micro-op cache | uop cache | decoded icache
85 Physical register file
85 Carry-lookahead adder | carry lookahead
100 Scoreboard | scoreboarding
`);

const fpga = p("bb-fpga", "Name an FPGA building block or resource", `
10 LUT | lookup table | look up table
10 Flip-flop | flip flop | ff
15 Block RAM | bram | block memory
15 DSP slice | dsp block | dsp48
15 I/O block | iob | io bank
15 CLB | configurable logic block
15 PLL | phase locked loop
30 Logic element | logic cell | le
30 Slice
30 Routing | interconnect | switch matrix | switch box
30 Carry chain
30 Global clock buffer | bufg | clock buffer
30 MMCM | mixed mode clock manager | dcm | digital clock manager
30 Transceiver | serdes | gtx | gth
30 LAB | logic array block
30 ALM | adaptive logic module
30 Distributed RAM | lutram
30 Configuration memory | bitstream
30 Hard processor | hps | processing system | zynq ps
60 Shift register LUT | srl | srl16 | srl32
60 UltraRAM | uram
60 M20K | m9k | m10k
60 PCIe hard block | pcie hard ip
60 Hard Ethernet MAC | hard mac
60 IDELAY | iodelay | input delay
60 ISERDES | oserdes
60 eFuse
60 JTAG port | jtag
60 XADC | system monitor | sysmon
60 Clock region | clock tree | global clock network
60 Hard memory controller | mig
85 Macrocell
85 PAL | programmable array logic
85 Antifuse
85 Pblock | partial reconfiguration region | partial reconfiguration
85 ICAP | internal configuration access port
100 CFGLUT5 | cfglut
`);

const failures = p("bb-failures", "Name a way a digital circuit can fail or misbehave", `
10 Short circuit | short
10 Overheating | thermal runaway
15 Glitch
15 Race condition
15 Metastability
15 Bit flip | single event upset | seu | soft error
15 Floating input | floating pin
15 Clock skew | skew
30 Setup time violation | setup violation
30 Hold time violation | hold violation
30 Timing violation
30 Ground bounce
30 Crosstalk
30 Ringing
30 Reflection | signal reflection
30 Bus contention
30 Latch-up | latchup
30 ESD damage | electrostatic discharge
30 Brownout | brown out
30 Jitter
30 Fanout exceeded | fanout
30 Deadlock
30 Stuck-at fault | stuck at 0 | stuck at 1
30 Switch bounce | contact bounce
60 Hazard | static hazard | dynamic hazard
60 Electromigration
60 Hot carrier injection | hci
60 NBTI | negative bias temperature instability
60 TDDB | time-dependent dielectric breakdown
60 Clock domain crossing error | cdc | clock domain crossing
60 Simultaneous switching noise | ssn
60 Overshoot | undershoot
60 Tin whiskers | whiskers
60 Cold solder joint | cold joint | cracked solder joint
60 Combinational loop
60 Power-on reset failure | por failure
85 Single event latch-up | sel
85 Rowhammer | row hammer
85 Charge sharing
85 Purple plague
85 Ground loop
100 Kirkendall voiding | kirkendall
`);

const computers = p("bb-computers", "Name a famous computer from history", `
10 ENIAC
10 Apple II | apple 2
10 Commodore 64 | c64
15 IBM PC | ibm 5150
15 Macintosh | apple macintosh | mac 128k
15 Altair 8800 | altair
15 UNIVAC | univac i
15 Colossus
15 Apollo Guidance Computer | agc
15 Cray-1 | cray
30 EDSAC
30 Harvard Mark I | mark i | ibm asc
30 Manchester Baby | baby | ssem
30 ZX Spectrum | spectrum
30 BBC Micro
30 Amiga | commodore amiga
30 PDP-11
30 PDP-8
30 IBM System/360 | system 360 | ibm 360
30 Atari 2600 | atari vcs
30 TRS-80
30 Zuse Z3 | z3
30 Atanasoff-Berry Computer | abc | atanasoff berry
30 Analytical Engine
30 Difference Engine
30 NeXT | next computer | nextcube
30 Apple I | apple 1
60 EDVAC
60 Whirlwind | mit whirlwind
60 LEO | lyons electronic office
60 CDC 6600
60 Apple Lisa | lisa
60 Xerox Alto | alto
60 Kenbak-1 | kenbak
60 IBM 701
60 Ferranti Mark 1
60 Osborne 1 | osborne
60 Commodore PET | pet
60 VIC-20
60 SAGE | an/fsq-7
60 MSX
60 Sinclair ZX80 | zx80 | zx81
85 Pilot ACE | ace
85 CSIRAC
85 UTEC | university of toronto electronic computer
85 FERUT
85 TX-0
85 Datapoint 2200
85 Zuse Z1 | z1
85 Harwell Dekatron | wolverhampton witch | witch
85 Elliott 803
85 IBM 1401
100 DRTE Computer | drte
`);

const languages = p("bb-languages", "Name a programming language used for embedded or hardware work", `
10 C
10 C++
10 Assembly | assembler | asm
10 Python
15 Rust
15 MicroPython
15 Arduino | arduino language | wiring
15 Verilog
15 VHDL
15 MATLAB
30 CircuitPython
30 Ada
30 Forth
30 Lua
30 Ladder logic | ladder diagram
30 Structured Text | st | iec 61131-3
30 LabVIEW
30 SystemVerilog
30 Simulink
30 Java | java me
30 BASIC | pbasic
30 Go | tinygo
30 Zig
30 Embedded C
60 SPARK
60 Chisel
60 Pascal | turbo pascal
60 OpenCL
60 CUDA
60 HLS | high level synthesis | vitis hls
60 Bluespec
60 Function block diagram | fbd
60 Sequential function chart | sfc | grafcet
60 Instruction list | il
60 Elixir | nerves
60 JavaScript | espruino
60 Nim
60 Embedded Swift | swift
85 PL/M
85 JOVIAL
85 Occam
85 Esterel
85 Lustre
85 Modula-2
85 MISRA C | misra
100 CORAL 66 | coral
`);

const logicFamilies = p("bb-logic-families", "Name a logic family", `
10 TTL | transistor-transistor logic
10 CMOS
15 ECL | emitter coupled logic
15 RTL | resistor transistor logic
15 DTL | diode transistor logic
15 74LS | low power schottky | ls ttl
15 74HC | hc | high speed cmos
15 4000 series | cd4000 | 4000 cmos
30 74HCT | hct
30 74AC | ac
30 74F | fast | fairchild advanced schottky
30 74S | schottky ttl
30 74LVC | lvc
30 LVDS | low voltage differential signaling
30 LVCMOS
30 LVTTL
30 NMOS logic | nmos
30 PMOS logic | pmos
30 BiCMOS
30 74ALS | als
30 74AHC | ahc
60 I²L | i2l | integrated injection logic
60 CML | current mode logic
60 PECL | lvpecl | positive ecl
60 GTL | gunning transceiver logic
60 SSTL | stub series terminated logic
60 HSTL | high speed transceiver logic
60 Domino logic | domino
60 Pass-transistor logic | pass transistor logic | ptl
60 74AUC | auc
60 74LVX | lvx
60 74ABT | abt
60 Diode logic | diode resistor logic
85 RSFQ | rapid single flux quantum
85 DCTL | direct-coupled transistor logic
85 Norbit
85 HTL | high threshold logic
85 Four-phase logic
85 Adiabatic logic
100 Tunnel diode logic | tdl
`);

const boolean = p("bb-boolean", "Name a Boolean algebra law or digital design technique", `
10 Truth table
10 Karnaugh map | k-map | kmap | karnaugh
10 De Morgan's laws | de morgan | demorgan | de morgans theorem
15 Boolean algebra
15 Sum of products | sop
15 Product of sums | pos
15 Minterm
15 Maxterm
15 Distributive law | distributive
15 Commutative law | commutative
15 Associative law | associative
15 Finite state machine | state machine | fsm
30 Don't care | don't care condition
30 Mealy machine | mealy
30 Moore machine | moore
30 Quine-McCluskey | quine mccluskey
30 Absorption law | absorption
30 Idempotent law | idempotence
30 Involution | double negation
30 Consensus theorem | consensus
30 Pipelining
30 One-hot encoding | one hot
30 Clock gating
30 Retiming
30 Duality principle | duality
30 Complement law | complement
60 Shannon expansion | shannon decomposition
60 Espresso | espresso heuristic
60 Petrick's method | petrick
60 Binary decision diagram | bdd
60 State encoding | state assignment
60 Resource sharing
60 Logic synthesis
60 Static timing analysis | sta
60 Technology mapping
60 Two-flop synchronizer | synchronizer
60 Handshaking | handshake
60 Hazard cover | redundant term
85 Reed-Muller expansion | reed muller
85 Ashenhurst decomposition
85 Davio expansion | davio
85 Veitch diagram | veitch
85 State minimization | state reduction
100 Blake canonical form | blake | complete sum
`);

export default {
  id: "bit-bucket",
  name: "Bit Bucket",
  description: "Gates, buses, CPUs, codes and computers that made history.",
  chapters: [
    [logicElements, buses, mcus, memory, eda, isa, encoding],
    [cpu, fpga, failures, computers, languages, logicFamilies, boolean],
  ],
};
