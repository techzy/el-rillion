import { p } from "../dsl.mjs";
import { modulation, antennas, rfConnectors, transforms, wireless } from "../legacy.mjs";

const bands = p("ota-bands", "Name a radio frequency band", `
10 FM band | fm | fm broadcast
10 AM band | am | am broadcast | medium wave | mw
10 VHF | very high frequency
10 UHF | ultra high frequency
15 HF | high frequency | shortwave | sw
15 2.4 GHz | 2.4ghz
15 5 GHz | 5ghz
15 ISM band | ism
15 LF | low frequency | longwave | long wave
15 MF | medium frequency
30 VLF | very low frequency
30 ELF | extremely low frequency
30 SHF | super high frequency
30 EHF | extremely high frequency
30 L band
30 S band
30 C band
30 X band
30 Ku band
30 Ka band
30 K band
30 mmWave | millimeter wave | millimetre wave
30 CB | citizens band | 11 meters
30 2 meters | 2m | 144 mhz
30 70 centimeters | 70cm | 440 mhz
30 20 meters | 20m
30 Sub-6 GHz | sub-6 | fr1
30 FR2
30 6 GHz | 6ghz | wifi 6e
60 V band
60 W band
60 P band
60 ULF | ultra low frequency
60 SLF | super low frequency
60 Terahertz | thz | thf | tremendously high frequency
60 900 MHz | 915 mhz | 868 mhz
60 Airband | aircraft band
60 Marine VHF | marine band
60 GMRS | frs
60 MURS
60 160 meters | 160m | top band
60 6 meters | 6m | magic band
60 40 meters | 40m
60 80 meters | 80m
60 10 meters | 10m
85 Q band
85 E band
85 D band
85 2200 meters | 2200m
85 630 meters | 630m
100 U band
`);

const radioUses = p("ota-uses", "Name something that uses radio waves", `
10 Cell phone | smartphone | mobile phone | phone
10 Wi-Fi router | router | wifi
10 Radio | car radio
10 Microwave oven | microwave
10 GPS
15 TV | television | tv broadcast
15 Radar
15 Bluetooth headphones | bluetooth | wireless earbuds | airpods
15 Walkie-talkie | walkie talkie | two way radio
15 Garage door opener
15 Key fob | car key fob | remote key
15 Satellite | satellite dish
15 Baby monitor
15 Drone | drone controller | rc car | remote control car
30 RFID tag | rfid
30 Contactless payment | tap to pay | contactless card | nfc
30 MRI | mri machine
30 Radio telescope
30 Cordless phone
30 Weather radar
30 Smart meter
30 Air traffic control | atc
30 Radar gun | police radar gun | speed gun
30 Avalanche beacon | avalanche transceiver
30 AirTag | bluetooth tracker | tile
30 Wireless doorbell
30 Pacemaker | implanted medical device
30 Smartwatch
30 Starlink dish | starlink
60 EPIRB | emergency beacon | plb
60 ILS | instrument landing system
60 VOR | vor beacon
60 ADS-B | transponder | adsb
60 Radiosonde | weather balloon
60 Ground-penetrating radar | gpr
60 Radio collar | wildlife tracking collar
60 Toll transponder | electronic toll tag | 407 etr transponder | e-zpass
60 Electrosurgery | diathermy
60 RF welding | dielectric heating
60 Pet microchip | microchip implant
60 TPMS | tire pressure sensor
60 Wireless microphone | wireless mic
85 Theremin
85 SETI | seti array
85 Ionosonde
85 Over-the-horizon radar
85 LORAN | loran-c
85 Radio-controlled clock | wwvb | atomic clock radio
85 Passive radar
100 The Thing | great seal bug
`);

const radar = p("ota-radar", "Name a type of radar", `
10 Doppler radar | doppler
10 Weather radar
10 Police radar | radar gun | speed gun
15 Pulse radar | pulsed radar
15 Phased array radar | phased array
15 Ground-penetrating radar | gpr
15 Air traffic control radar | atc radar | primary surveillance radar | psr
15 Marine radar
15 FMCW radar | fmcw | frequency modulated continuous wave
30 Synthetic aperture radar | sar
30 Automotive radar | 77 ghz radar
30 Secondary surveillance radar | ssr
30 Over-the-horizon radar | oth | over the horizon
30 AESA | active electronically scanned array
30 PESA | passive electronically scanned array
30 Bistatic radar | bistatic
30 Monostatic radar | monostatic
30 Passive radar
30 Continuous-wave radar | cw radar
30 Fire-control radar | fire control
30 AWACS | airborne early warning | aew
30 Radar altimeter | altimeter
30 NEXRAD | wsr-88d
30 Chain Home
60 Inverse SAR | isar
60 Moving target indication | mti
60 Pulse-Doppler | pulse doppler
60 Monopulse radar | monopulse
60 InSAR | interferometric sar
60 Wind profiler
60 Through-wall radar
60 Noise radar
60 UWB radar | ultra-wideband radar
60 Conical scanning | conical scan
60 Track-while-scan | tws
60 Terrain-following radar
60 Multistatic radar
60 Doppler beam sharpening
60 Dual-polarization radar | polarimetric radar | dual pol
60 Precision approach radar | par
85 Chain Home Low
85 Würzburg radar | wurzburg
85 Duga radar | russian woodpecker | duga
85 H2S radar | h2s
85 Freya radar | freya
85 Sea-Based X-Band Radar | sbx
100 Jindalee | jorn | jindalee operational radar network
`);

const rfParams = p("ota-rf-params", "Name an RF measurement or parameter", `
10 Frequency
10 Gain
10 Power | dbm
10 Impedance
15 VSWR | swr | standing wave ratio
15 S-parameters | s parameters | scattering parameters
15 Return loss
15 Insertion loss
15 Noise figure | nf
15 Bandwidth
15 Attenuation | loss
15 Signal-to-noise ratio | snr | s/n
30 S11
30 S21
30 Smith chart
30 Reflection coefficient | gamma
30 P1dB | 1 db compression point | compression point
30 IP3 | third order intercept | iip3 | oip3 | toi
30 Phase noise
30 EVM | error vector magnitude
30 ACLR | acpr | adjacent channel power
30 Isolation
30 Directivity
30 Q factor | quality factor | q
30 Group delay
30 Harmonics | harmonic distortion
30 Spurious emissions | spurs
30 Receiver sensitivity | sensitivity
30 Dynamic range
30 EIRP | effective isotropic radiated power | erp
30 Antenna gain | dbi
30 Beamwidth
30 Noise temperature
60 Intermodulation distortion | imd
60 Image rejection
60 SFDR | spurious-free dynamic range
60 Blocking | blocker
60 Selectivity
60 Mismatch loss
60 Rollett stability factor | k factor | stability factor
60 Power-added efficiency | pae
60 AM-to-PM conversion | am/pm
60 Crest factor | papr | peak to average
60 Occupied bandwidth | obw
60 Cross-polarization discrimination | xpd | cross pol
60 Front-to-back ratio | f/b
60 Fresnel zone
60 Link budget
85 Noise power ratio | npr
85 Allan deviation | allan variance
85 Mu factor | μ-factor | edwards sinsky
85 Group delay ripple
85 IP2 | second-order intercept
100 Maximum stable gain | msg
`);

const rfComponents = p("ota-rf-components", "Name an RF component", `
10 Antenna
10 RF amplifier | amplifier
10 Filter | rf filter
10 Mixer
15 LNA | low noise amplifier
15 Power amplifier | pa
15 Local oscillator | oscillator | lo
15 Attenuator
15 RF switch | switch
15 Power splitter | splitter | power divider | combiner
15 Coax cable | cable | coax
30 Circulator
30 Isolator
30 Duplexer
30 Diplexer
30 Directional coupler | coupler
30 Balun
30 PLL | phase locked loop | synthesizer
30 VCO | voltage controlled oscillator
30 Bias tee | bias-t
30 Power detector | detector | rf detector
30 Limiter
30 Termination | dummy load | 50 ohm terminator
30 Waveguide
30 Phase shifter
30 SAW filter
30 Cavity filter
30 Matching network | impedance matching network
30 Wilkinson divider | wilkinson
60 Quadrature hybrid | 90 degree hybrid | hybrid coupler | branch line coupler
60 Rat-race coupler | rat race | 180 degree hybrid
60 Magic tee | magic t | hybrid tee
60 Lange coupler | lange
60 BAW filter | baw | fbar
60 Varactor | varactor diode
60 PIN diode switch | pin diode
60 YIG filter | yig
60 Frequency multiplier | doubler
60 Prescaler
60 Envelope tracker | envelope tracking
60 Doherty amplifier | doherty
60 Rotary joint
60 Orthomode transducer | omt
60 Feedhorn | feed horn
85 Waveguide iris | iris
85 Septum polarizer
85 Gilbert cell mixer | gilbert cell
85 Double-balanced mixer | diode ring mixer | ring mixer
85 Choke flange
85 TWTA | traveling wave tube amplifier
100 Faraday rotator
`);

const satellites = p("ota-satellites", "Name a satellite or satellite system", `
10 GPS | navstar
10 Starlink
10 International Space Station | iss
10 Hubble Space Telescope | hubble
15 Sputnik | sputnik 1
15 GLONASS
15 Galileo
15 BeiDou | compass
15 Iridium
15 James Webb Space Telescope | jwst | james webb
15 Voyager | voyager 1 | voyager 2
30 Telstar | telstar 1
30 Inmarsat
30 Intelsat | early bird | intelsat i
30 OneWeb
30 Globalstar
30 Landsat
30 GOES
30 NOAA polar satellites | noaa | poes
30 TDRS | tracking and data relay satellite
30 SiriusXM | sirius | xm
30 DirecTV
30 Project Kuiper | kuiper
30 RADARSAT | radarsat-1 | radarsat constellation
30 Anik | anik a1
30 Alouette | alouette 1
30 Explorer 1
30 Vanguard 1 | vanguard
30 Syncom | syncom 3
30 Echo | echo 1 | project echo
60 Molniya
60 Orbcomm
60 Thuraya
60 QZSS | michibiki
60 NavIC | irnss
60 Sentinel | copernicus sentinel
60 TIROS-1 | tiros
60 Relay 1 | relay
60 Project SCORE | score
60 Courier 1B | courier
60 Hermes | cts hermes
60 LAGEOS
60 OSCAR 1 | oscar | amsat
60 AO-7 | oscar 7
60 Transit | navy navigation satellite system
60 Tsikada | parus
85 Ekran
85 Gorizont
85 Luch
85 Vela | vela satellites
100 Project West Ford | west ford | needles
`);

const ham = p("ota-ham", "Name a ham radio term or Q-code", `
10 Call sign | callsign
10 CQ
10 73 | seventy three | best regards
15 QSO
15 QSL | qsl card
15 Repeater
15 DX | dxing
15 Rig
15 Morse code | cw
15 SSB | single sideband
15 Simplex
30 QTH
30 QRP
30 QRM
30 QRN
30 QSY
30 QRZ
30 QRT
30 QRO
30 88 | love and kisses
30 Elmer
30 Ragchew | rag chew | ragchewing
30 Field Day | arrl field day
30 Contesting | contest
30 Net | ham net
30 Repeater offset | offset
30 CTCSS | pl tone | tone squelch | privacy tone
30 SWR
30 APRS
30 FT8
30 POTA | parks on the air
30 SOTA | summits on the air
30 Pileup | pile up
30 HT | handie talkie | handheld transceiver
30 Antenna tuner | tuner | atu | matchbox
30 Phonetic alphabet | nato phonetic | alpha bravo charlie
60 QRX
60 QRL
60 QSB
60 QTC
60 QRS
60 QRQ
60 Lid
60 Splatter
60 Iambic keyer | keyer | iambic
60 Straight key | bug
60 Tropo | tropospheric ducting
60 Sporadic E | es
60 Grey line | gray line propagation
60 EME | moonbounce | earth moon earth
60 Meteor scatter
60 Fox hunt | transmitter hunting
60 WAS | worked all states
60 DXCC
60 Grid square | maidenhead locator | maidenhead
85 Long path | long-path propagation
85 Alligator
85 Kerchunk | kerchunking
85 Shack | radio shack
85 Harmonics
85 XYL
100 QLF
`);

const av = p("ota-av", "Name an audio or video connector", `
10 HDMI
10 3.5 mm jack | 3.5mm | headphone jack | aux | aux cable | trs
10 RCA | phono | rca jack
15 XLR
15 6.35 mm jack | quarter inch | 1/4 inch | 6.35mm | trs jack
15 DisplayPort | dp
15 VGA | d-sub 15 | de-15
15 USB-C | usb c
15 TOSLINK | optical | s/pdif optical | spdif
30 DVI
30 S-Video | svideo
30 Composite video | composite
30 Component video | component | ypbpr
30 SCART | peritel
30 Lightning
30 Speakon
30 Banana plug | banana
30 BNC
30 F connector | f-type
30 MIDI | din 5 | 5 pin din
30 Coaxial S/PDIF | coaxial digital
30 Mini DisplayPort | mini dp
30 Mini HDMI | micro hdmi
30 2.5 mm jack | 2.5mm
30 TRRS
60 Mini-XLR | mini xlr | ta4f
60 Thunderbolt
60 Binding post | binding posts
60 Mini-DIN | mini din
60 ADAT Lightpipe | adat
60 AES3 | aes/ebu
60 TT jack | tiny telephone | bantam
60 powerCON | neutrik powercon
60 SDI | hd-sdi | sdi bnc
60 Apple 30-pin | 30 pin dock connector
60 Mini TOSLINK | mini toslink
60 Euroblock | phoenix connector
85 DIN 41524 | din audio
85 D-Terminal | d terminal
85 Belling-Lee | tv aerial connector | iec 169-2
85 AV Multi Out | av multi | playstation av
85 Apple Display Connector | adc
100 Tuchel connector | tuchel
`);

const propagation = p("ota-propagation", "Name something that causes signal loss or interference", `
10 Distance | path loss | free space path loss | fspl
10 Walls | buildings | obstruction | obstacles
10 Interference
15 Multipath | multipath fading
15 Fading
15 Attenuation
15 Rain fade | rain
15 Thermal noise | noise
15 Reflection
15 Absorption
15 Doppler shift | doppler
30 Diffraction
30 Scattering
30 Shadowing | shadow fading
30 Rayleigh fading
30 Rician fading | rician
30 Co-channel interference | co channel
30 Adjacent-channel interference | adjacent channel
30 Jamming | jammer
30 EMI
30 Intermodulation | intermod
30 Impedance mismatch | mismatch
30 Feedline loss | cable loss | coax loss
30 Polarization mismatch | cross polarization
30 Fresnel zone obstruction | fresnel zone
30 Ionospheric absorption | d layer absorption
30 Atmospheric absorption | oxygen absorption | water vapor absorption
30 Foliage | trees | vegetation loss
30 Near-far problem | near far
30 Hidden node problem | hidden node | hidden terminal
60 Skin effect
60 Dielectric loss | loss tangent
60 Tropospheric ducting | ducting
60 Scintillation
60 Faraday rotation
60 Delay spread
60 Inter-symbol interference | isi
60 Solar flare | sudden ionospheric disturbance | radio blackout
60 Sporadic E
60 Knife-edge diffraction | knife edge
60 Phase noise
60 Desensitization | desense
60 Passive intermodulation | pim
60 Rusty bolt effect | rusty bolt
60 Body loss | human body
85 Spectral regrowth
85 Rain depolarization
85 Ground loss
85 Corona discharge noise | corona
100 Polar cap absorption | pca event
`);

export default {
  id: "on-the-air",
  name: "On the Air",
  description: "Bands, radar, RF hardware, satellites and the ham shack.",
  chapters: [
    [modulation, antennas, rfConnectors, transforms, wireless, bands, radioUses],
    [radar, rfParams, rfComponents, satellites, ham, av, propagation],
  ],
};
