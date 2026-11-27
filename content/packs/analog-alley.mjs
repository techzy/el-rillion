import { p } from "../dsl.mjs";
import { opampCircuits, oscillators, amplifiers, filters, famousParts } from "../legacy.mjs";

const noise = p("aa-noise", "Name a source of noise or interference in a circuit", `
10 Thermal noise | johnson noise | johnson-nyquist noise | resistor noise
10 Hum | mains hum | 60 hz hum | 50 hz hum
15 Shot noise
15 Flicker noise | 1/f noise | pink noise | one over f noise
15 EMI | electromagnetic interference | rfi | radio frequency interference
15 Crosstalk
15 Ground loop
30 Switching noise | switching regulator noise
30 Quantization noise | quantisation noise
30 Popcorn noise | burst noise | random telegraph noise
30 Ground bounce
30 Ripple | power supply ripple
30 Phase noise
30 Jitter | clock jitter
30 Avalanche noise
30 Microphonics | microphonic noise
30 ESD | electrostatic discharge
60 Partition noise
60 Generation-recombination noise | g-r noise
60 kTC noise | reset noise
60 Triboelectric noise | cable noise
60 Thermal EMF | thermocouple effect | seebeck offset
60 Dielectric absorption | soakage
60 Aliasing
60 Intermodulation | intermod
85 Barkhausen noise
85 Contact noise | excess noise
85 Spurious tone | spur | idle tone
85 Singing capacitors | singing caps | piezoelectric capacitor noise
85 Coil whine
100 Cosmic noise | galactic noise | jansky noise
`);

const opampSpecs = p("aa-opamp-specs", "Name a spec on an op-amp datasheet", `
10 Open-loop gain | gain | open loop gain
10 Bandwidth
10 Supply voltage
15 Slew rate
15 Gain-bandwidth product | gbw | gbp | gain bandwidth
15 Input offset voltage | offset voltage | vos
15 Input bias current | bias current
15 CMRR | common-mode rejection ratio | common mode rejection
15 Input impedance | input resistance
30 PSRR | power supply rejection ratio
30 Output impedance | output resistance
30 Rail-to-rail | rail to rail output | rail to rail input
30 Supply current | quiescent current | iq
30 Input offset current | offset current
30 Voltage noise density | noise density | input voltage noise
30 Unity-gain frequency | unity gain bandwidth
30 Phase margin
30 Settling time
30 Input common-mode range | common mode input range | icmr
30 Output voltage swing | output swing
30 Short-circuit current | output short circuit current
60 Offset voltage drift | vos drift | offset drift
60 THD+N | total harmonic distortion | thd
60 Full-power bandwidth | full power bandwidth
60 Current noise density | input current noise
60 Overload recovery time | overload recovery
60 Capacitive load drive | capacitive load
60 Input capacitance
60 Operating temperature range | temperature range
60 Absolute maximum ratings | abs max
60 Thermal resistance | theta ja | θja
85 1/f corner frequency | corner frequency | flicker corner
85 EMIRR | emi rejection ratio
85 Channel separation
85 Maximum differential input voltage | differential input voltage
85 Phase reversal
100 Long-term offset drift | aging drift | long term drift
`);

const control = p("aa-control", "Name a term from control or feedback theory", `
10 Feedback | negative feedback
10 PID | pid controller | proportional integral derivative
10 Setpoint | set point
15 Transfer function
15 Overshoot
15 Steady-state error | steady state error
15 Bode plot | bode
15 Settling time
15 Rise time
15 Pole
15 Zero
15 Stability
30 Phase margin
30 Gain margin
30 Root locus
30 Nyquist plot | nyquist diagram
30 Damping ratio | damping
30 Natural frequency
30 Open loop | open-loop
30 Closed loop | closed-loop
30 Step response
30 Loop gain
30 State space | state-space
30 Laplace transform
30 Routh-Hurwitz | routh
60 Lead compensator | lead compensation | lead
60 Lag compensator | lag compensation | lag
60 Feedforward | feed forward
60 Integral windup | windup | anti-windup
60 Dead time | time delay | transport delay
60 Controllability
60 Observability
60 Kalman filter
60 LQR | linear quadratic regulator
60 Bang-bang control | bang bang | on-off control
60 Dominant pole
60 Crossover frequency
85 Nichols chart | nichols
85 Smith predictor
85 Ziegler-Nichols | ziegler nichols tuning
85 Lyapunov stability | lyapunov
85 Sliding mode control | sliding mode
85 Model predictive control | mpc
85 Gain scheduling
100 Youla parameterization | youla
`);

const pedals = p("aa-pedals", "Name a guitar effect or effects pedal", `
10 Distortion
10 Overdrive
10 Delay | echo
10 Reverb
15 Fuzz
15 Wah | wah-wah | wah wah
15 Chorus
15 Flanger
15 Phaser
15 Tremolo
15 Compressor | compression
30 Looper | loop pedal
30 Octaver | octave | octave pedal
30 Boost | clean boost
30 Noise gate | gate
30 Tube Screamer | ts808 | ts9
30 Big Muff | big muff pi
30 Fuzz Face
30 Pitch shifter | whammy | harmonizer
30 EQ | equalizer | graphic eq
30 Volume pedal | expression pedal
30 Vibrato
60 Envelope filter | auto wah | autowah
60 Ring modulator | ring mod
60 Uni-Vibe | univibe
60 Talk box | talkbox
60 Bitcrusher | bit crusher
60 Klon Centaur | klon
60 ProCo Rat | rat
60 Rotary speaker | leslie
60 Tape echo | echoplex | space echo
60 Treble booster | rangemaster
85 Tone Bender
85 Maestro Fuzz-Tone | fuzz-tone | fz-1
85 Spring reverb | spring tank
85 Optical compressor
85 Bucket-brigade delay | bbd | bucket brigade
85 Vocoder
100 Plate reverb | emt 140
`);

const adc = p("aa-adc", "Name a type of ADC or DAC", `
10 SAR ADC | sar | successive approximation
10 Delta-sigma ADC | sigma delta | delta sigma | σδ adc
10 Flash ADC | flash | parallel adc
15 Pipeline ADC | pipelined adc | pipeline
15 R-2R ladder | r2r | r-2r dac | resistor ladder
15 PWM DAC | pwm
15 Dual-slope ADC | dual slope | integrating adc
30 Binary-weighted DAC | binary weighted
30 Current-steering DAC | current steering
30 String DAC | resistor string dac | kelvin divider
30 Single-slope ADC | single slope | ramp adc
30 Tracking ADC | counter adc | counting adc
30 Time-interleaved ADC | time interleaved
30 Subranging ADC | subranging | two-step adc
30 Voltage-to-frequency converter | vfc | v to f
30 Multiplying DAC | mdac
60 Folding ADC | folding interpolating
60 Charge-redistribution DAC | charge redistribution | capacitive dac
60 VCO-based ADC | vco adc
60 Time-to-digital converter | tdc
60 1-bit DAC | bitstream dac
60 Noise-shaping SAR | ns-sar
60 Audio codec | codec
85 Cyclic ADC | algorithmic adc
85 Delta modulator | delta modulation adc
85 Thermometer-coded DAC | thermometer coded | unary dac
85 Asynchronous SAR | async sar
85 Photonic ADC | optical adc
100 Wilkinson ADC | wilkinson
`);

const scope = p("aa-scope", "Name an oscilloscope control or feature", `
10 Trigger
10 Timebase | time/div | time per division | horizontal scale
10 Volts/div | volts per division | vertical scale
15 Probe
15 Channel
15 Autoset | auto set | autoscale
15 Trigger level
15 Cursors | cursor
15 Run/Stop | run stop
15 Single shot | single | single trigger
15 Coupling | ac coupling | dc coupling
30 Edge trigger
30 Probe compensation | probe comp
30 10x probe | x10 probe | 10:1 probe
30 FFT | spectrum
30 XY mode | x-y mode | lissajous
30 Persistence | infinite persistence
30 Math channel | math
30 Automatic measurements | measurements
30 Holdoff | trigger holdoff
30 Bandwidth limit | bw limit
30 Averaging | average
30 Roll mode
30 Zoom
30 Ground clip | ground lead
60 Pulse width trigger
60 Protocol decode | serial decode
60 Segmented memory | segmented acquisition
60 Mask testing | mask test | pass fail
60 Eye diagram
60 Memory depth | record length
60 Sample rate
60 Pre-trigger | pretrigger
60 Peak detect | glitch capture
60 Runt trigger
60 Differential probe
60 Current probe
60 High-resolution mode | hi-res mode | eres
85 Envelope mode
85 Delayed sweep | b sweep | delayed timebase
85 Graticule
85 Intensity | trace intensity
85 Focus | astigmatism
100 Beam finder
`);

const waveforms = p("aa-waveforms", "Name a waveform shape or test signal", `
10 Sine wave | sine | sinusoid
10 Square wave | square
10 Triangle wave | triangle
10 Sawtooth wave | sawtooth | saw
15 Pulse | pulse train
15 DC | direct current
15 Ramp
15 White noise | noise
30 Pink noise
30 PWM | pulse width modulated
30 Chirp | sweep | frequency sweep
30 Step | step function | unit step
30 Impulse | dirac delta | delta function
30 Damped sine | damped oscillation | ringing
30 Half-wave rectified sine | half wave rectified
30 Full-wave rectified sine | full wave rectified
30 Staircase | stairstep
30 Trapezoid | trapezoidal
30 Exponential decay | exponential
30 Tone burst | burst
30 Sinc | sinc pulse
30 Gaussian pulse | gaussian
60 Brown noise | brownian noise | red noise
60 Blue noise
60 Raised cosine pulse | raised cosine
60 Haversine
60 Lorentzian
60 Modified sine wave | quasi sine
60 Shark fin
60 ECG | heartbeat | cardiac
60 Rectangular pulse | rect | boxcar
60 Doublet | doublet pulse
85 Reverse sawtooth | inverse sawtooth | ramp down
85 Gaussian monocycle | monocycle
85 Barker code
85 PRBS | maximum length sequence | mls | m-sequence | pseudorandom binary sequence
85 Dirac comb | impulse train | shah function
100 Zadoff-Chu sequence | zadoff chu
`);

const passives = p("aa-passives", "Name a passive component that isn't a resistor or capacitor", `
10 Inductor | coil
10 Transformer
15 Ferrite bead
15 Crystal | quartz crystal
15 Fuse
15 Choke | rf choke
15 Antenna
30 Common-mode choke | common mode choke
30 Ceramic resonator | resonator
30 Balun
30 SAW filter
30 Gas discharge tube | gdt
30 Spark gap
30 Piezo buzzer | buzzer | piezo element
30 Speaker | loudspeaker
30 Switch
30 Relay
30 Connector
30 Toroid | toroidal inductor
30 Wire | jumper
60 Autotransformer | variac
60 Current transformer | ct
60 Ferrite core | ferrite
60 Transmission line | stripline | microstrip
60 Circulator
60 Isolator
60 Directional coupler | coupler
60 Attenuator | pad
60 Waveguide
60 Delay line
60 Memristor
60 Fusible link
60 Air-core inductor | air core
60 Saturable reactor
85 Variometer
85 Loading coil
85 Ferrite rod
85 Bifilar coil | bifilar winding
100 Hybrid coil | hybrid transformer
`);

const designers = p("aa-designers", "Name a famous analog circuit designer", `
10 Bob Widlar | widlar | robert widlar
10 Bob Pease | pease | robert pease
15 Jim Williams | williams
15 Hans Camenzind | camenzind
15 Paul Horowitz | horowitz
15 Winfield Hill | hill
30 Barrie Gilbert | gilbert
30 Paul Brokaw | brokaw
30 George Philbrick | philbrick
30 Harold Black | black
30 Hendrik Bode | bode
30 Dave Fullagar | fullagar
30 Walt Jung | jung
30 Behzad Razavi | razavi
30 Adel Sedra | sedra
30 Kenneth C. Smith | kc smith | k c smith
30 Edwin Armstrong | armstrong
60 Jim Solomon | solomon
60 Bruce Hofer | hofer
60 Derek Bowers | bowers
60 Ray Stata | stata
60 Bob Dobkin | dobkin
60 Robert Swanson | swanson
60 Carl Nelson | nelson
60 Jerald Graeme | graeme
60 Sergio Franco | franco
60 Thomas Lee | tom lee
60 Paul Gray | gray
60 Robert Meyer | meyer
60 Willy Sansen | sansen
85 Carver Mead | mead
85 Bernard Oliver | barney oliver | oliver
85 Alan Blumlein | blumlein
85 Otto Schmitt | schmitt
85 Sidney Darlington | darlington
85 George Sziklai | sziklai
100 John Ragazzini | ragazzini
`);

export default {
  id: "analog-alley",
  name: "Analog Alley",
  description: "Op-amps, oscillators, filters, noise and the people who tamed them.",
  chapters: [
    [opampCircuits, oscillators, amplifiers, filters, famousParts, noise, opampSpecs],
    [control, pedals, adc, scope, waveforms, passives, designers],
  ],
};
