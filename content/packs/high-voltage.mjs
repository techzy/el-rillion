import { p } from "../dsl.mjs";
import { converters, motors, batteries, generation, protection } from "../legacy.mjs";

const grid = p("hv-grid", "Name a part of the power grid", `
10 Power plant | generating station | generator
10 Transmission line | power line | high voltage line
10 Transformer
10 Substation
15 Transmission tower | pylon | hydro tower | electricity pylon
15 Utility pole | power pole | telephone pole
15 Distribution line
15 Insulator
15 Circuit breaker | breaker
15 Smart meter | meter | electricity meter
30 Busbar | bus
30 Switchgear
30 Step-up transformer
30 Pole-mounted transformer | pole transformer | can transformer
30 Pad-mounted transformer | padmount | green box
30 Feeder
30 Recloser
30 Capacitor bank
30 HVDC link | hvdc
30 Control centre | control center | scada
30 Grid-scale battery | battery storage | bess
30 Interconnector | intertie | tie line
30 Disconnect switch | isolator | disconnector
30 Fuse cutout | cutout
60 Current transformer | ct
60 Voltage transformer | potential transformer | pt | vt
60 Shield wire | overhead ground wire | static wire | earth wire
60 Surge arrester | lightning arrester
60 Converter station
60 Synchronous condenser
60 STATCOM | static synchronous compensator
60 SVC | static var compensator
60 Shunt reactor | reactor
60 Phase-shifting transformer | phase shifter | quadrature booster
60 Step voltage regulator | voltage regulator
60 Stockbridge damper | damper | spacer damper
60 Marker ball | aerial marker | bird diverter
60 Corona ring | grading ring
60 Ground grid | earthing grid
85 Sectionalizer
85 Bundled conductor | bundle conductor
85 Wave trap | line trap
85 Dead-end tower | strain tower | anchor tower
85 Transposition tower | transposition
100 Arcing horns | arcing horn
`);

const home = p("hv-home", "Name something in a home's electrical system", `
10 Outlet | receptacle | socket | plug socket
10 Light switch | switch
10 Circuit breaker | breaker
10 Electrical panel | breaker panel | panel | fuse box | consumer unit | load centre
15 Wiring | wire
15 Electricity meter | meter | hydro meter
15 GFCI outlet | gfci | gfi | rcd
15 Fuse
15 Power bar | power strip | extension cord
15 Ground wire | ground | earth
15 Neutral wire | neutral
15 Hot wire | live wire | live
30 Junction box | box
30 Main breaker | main disconnect
30 Romex | nm cable | nmd90 | nm-b
30 Wire nut | marrette | twist-on connector
30 Dimmer | dimmer switch
30 Three-way switch | 3-way switch
30 AFCI | arc fault breaker
30 Smoke alarm | smoke detector
30 Subpanel | sub panel
30 Conduit
30 Service drop | service entrance | drop
30 Bus bar | busbar
30 Doorbell transformer | doorbell
30 Whole-home surge protector | surge protector
60 Ground rod | grounding electrode
60 Bonding jumper | bonding
60 Neutral bar | neutral bus
60 Ground bar
60 Meter base | meter socket
60 Weatherhead | service head
60 Transfer switch | generator interlock
60 Tamper-resistant receptacle | tr outlet | tamper resistant
60 Split receptacle
60 Pigtail
60 Cable staple | staples
60 Box extender
85 Ufer ground | concrete encased electrode | ufer
85 Service mast | mast
85 Knob and tube | knob-and-tube
85 Aluminum wiring
100 Split-bolt connector | split bolt
`);

const plugs = p("hv-plugs", "Name a plug or socket standard", `
10 NEMA 5-15 | type b | north american plug
10 Type A | nema 1-15
10 Schuko | type f | cee 7/4
15 Type G | bs 1363 | uk plug
15 Europlug | type c | cee 7/16
15 Type I | australian plug | as/nzs 3112
15 IEC C13 | c13 | kettle lead | iec cable
15 USB-C | usb c
30 NEMA 14-50 | 14-50
30 NEMA 5-20 | 5-20
30 NEMA 6-50 | welder plug | 6-50
30 NEMA L5-30 | twist lock | l5-30
30 NEMA TT-30 | tt-30 | rv plug
30 IEC C7 | figure 8 | figure-8 | c7
30 IEC C5 | cloverleaf | mickey mouse | c5
30 IEC C19 | c19
30 Type E | french plug
30 Type D | indian plug
30 Type J | swiss plug
30 Type L | italian plug
30 Type H | israeli plug
30 Type K | danish plug
30 Type M | south african plug
30 Type N | brazilian plug
30 J1772 | type 1 | sae j1772
30 Type 2 | mennekes
30 CCS | combined charging system
30 CHAdeMO
30 NACS | tesla connector | sae j3400
60 CEE 7/7 | hybrid schuko
60 IEC 60309 | commando | pin and sleeve
60 BS 546 | round pin plug
60 GB 2099 | chinese plug
60 NEMA 10-30 | 10-30 | dryer plug
60 IEC C15 | c15
60 IEC C1 | c1
60 Saf-D-Grid
60 GB/T | gbt charger
85 Type O | thai plug
85 SEV 1011 | sev
85 BS 4343
85 Edison screw adapter | e26 | e27 | lamp socket adapter
100 NEMA 2-15 | 2-15
`);

const ev = p("hv-ev", "Name a part of an electric vehicle", `
10 Battery pack | battery | traction battery
10 Electric motor | motor | traction motor
10 Charging port | charge port | inlet
15 Inverter | traction inverter
15 Onboard charger | obc | on-board charger
15 Battery management system | bms
15 Regenerative braking | regen
15 DC-DC converter | dc dc converter
15 12V battery | 12 volt battery | auxiliary battery
30 Contactor | main contactor
30 Precharge resistor | precharge
30 Cell | battery cell
30 Module | battery module
30 Battery cooling | thermal management | coolant loop | chiller
30 Heat pump
30 High-voltage cable | orange cable | hv cable
30 Reduction gear | gearbox | single speed transmission
30 Busbar
30 Charging cable | charge cable | evse cable
30 Manual service disconnect | service disconnect | msd
30 Pyro fuse | pyrofuse | pyrotechnic fuse
30 Frunk | front trunk
60 Drive unit | e-axle | eaxle
60 Resolver
60 Insulation monitoring device | isolation monitor | imd
60 Cell balancing | balancing circuit
60 Current shunt | current sensor
60 PTC heater
60 HVIL | high voltage interlock loop | interlock loop
60 Skateboard chassis | skateboard
60 Cell-to-pack | ctp | structural battery pack
60 Bidirectional charger | v2g | vehicle to grid
60 Hairpin stator | hairpin winding
85 Silicon carbide inverter | sic inverter
85 Vent gas sensor | thermal runaway sensor
85 Burst disc | battery vent | vent
85 Cold plate
85 Control pilot | cp line | pilot signal
100 Proximity pilot | pp
`);

const transformer = p("hv-transformer", "Name a part of a transformer", `
10 Primary winding | primary | primary coil
10 Secondary winding | secondary | secondary coil
10 Core | iron core
15 Laminations | lamination | laminated core
15 Winding | coil | windings
15 Insulation
15 Transformer oil | oil | mineral oil
15 Bushing | bushings
30 Tap changer | taps | tap
30 Tertiary winding | tertiary
30 Radiator | cooling fins | radiators
30 Conservator tank | conservator
30 Tank | main tank
30 Cooling fan | fans
30 Nameplate | rating plate
30 Buchholz relay
30 Breather | silica gel breather | dehydrating breather
30 Yoke
30 Limb | leg
30 Centre tap | center tap
30 Bobbin | coil former
30 Air gap | gap
60 On-load tap changer | oltc
60 Off-load tap changer | detc | de-energized tap changer
60 Pressure relief device | pressure relief valve | prv
60 Oil temperature indicator | oti
60 Winding temperature indicator | wti
60 Electrostatic shield | faraday shield
60 Magnetic shunt | shunt
60 Kraft paper | insulating paper | pressboard
60 Neutral bushing | neutral terminal
60 Explosion vent
60 Grain-oriented steel | grain oriented electrical steel | goes
85 Amorphous core | amorphous metal
85 Core clamp | clamping frame
85 Sudden pressure relay
85 Oil level gauge | magnetic oil level gauge | mog
85 Interleaved winding | sandwich winding
100 Static ring | stress ring
`);

const blackouts = p("hv-blackouts", "Name a famous blackout or electrical disaster", `
10 Northeast blackout of 2003 | 2003 blackout | northeast blackout | 2003 northeast blackout
10 Chernobyl | chernobyl disaster
10 Texas power crisis | texas freeze | 2021 texas blackout | winter storm uri | uri
15 Fukushima | fukushima daiichi
15 Northeast blackout of 1965 | 1965 blackout
15 New York blackout of 1977 | 1977 blackout | nyc blackout
15 Hurricane Maria blackout | puerto rico blackout | hurricane maria
15 1989 Quebec blackout | quebec 1989 | 1989 geomagnetic storm | hydro quebec blackout
15 Three Mile Island | tmi
30 1998 ice storm | ice storm of 1998 | great ice storm
30 2012 India blackout | india blackout
30 2003 Italy blackout | italy blackout
30 2025 Iberian blackout | iberian blackout | spain blackout | spain portugal blackout
30 Carrington Event | carrington
30 2015 Ukraine grid attack | ukraine power grid attack | ukraine grid hack
30 Camp Fire | paradise fire
30 1996 Western North America blackout | 1996 blackout
30 2016 South Australia blackout | south australia blackout
30 2019 UK blackout | great britain blackout
30 2023 Pakistan blackout | pakistan blackout
30 2011 Southwest blackout | southwest blackout
60 2009 Brazil blackout | brazil blackout
60 2019 Java-Bali blackout | java bali blackout | indonesia blackout
60 2014 Bangladesh blackout | bangladesh blackout
60 1998 Auckland power crisis | auckland power crisis
60 2006 European blackout | european blackout
60 2005 Moscow blackout | moscow blackout
60 2019 Venezuela blackout | venezuela blackout
60 Windscale fire | windscale
60 Tokaimura criticality accident | tokaimura
85 Kyshtym disaster | kyshtym
85 Sayano-Shushenskaya accident | sayano shushenskaya
85 Banqiao Dam failure | banqiao
100 SL-1 | sl-1 accident
`);

const plants = p("hv-plants", "Name a famous power plant or dam", `
10 Hoover Dam | hoover | boulder dam
10 Three Gorges Dam | three gorges
10 Niagara Falls | sir adam beck | niagara | adams power plant
15 Itaipu Dam | itaipu
15 Chernobyl Nuclear Power Plant | chernobyl
15 Fukushima Daiichi | fukushima
15 Grand Coulee Dam | grand coulee
15 Churchill Falls
30 Bruce Nuclear | bruce power | bruce
30 Robert-Bourassa | la grande-2 | lg-2
30 Diablo Canyon
30 Palo Verde
30 Three Mile Island | tmi
30 Hinkley Point | hinkley point c
30 Kashiwazaki-Kariwa | kashiwazaki kariwa
30 Zaporizhzhia | zaporizhzhia nuclear power plant | zaporizhia
30 Pickering
30 Darlington
30 Drax | drax power station
30 Ivanpah | ivanpah solar
30 Hornsea | hornsea wind farm
30 Bhadla Solar Park | bhadla
30 Gansu Wind Farm | jiuquan wind farm | gansu
30 Aswan High Dam | aswan
30 Battersea Power Station | battersea
30 Pearl Street Station | pearl street
60 Belo Monte
60 Guri Dam | guri
60 Xiluodu
60 Baihetan
60 Tarbela Dam | tarbela
60 Kariba Dam | kariba
60 Taichung Power Plant | taichung
60 Bath County Pumped Storage | bath county
60 Dinorwig | electric mountain
60 W.A.C. Bennett Dam | bennett dam | gordon m shrum
60 Mica Dam | mica
60 Site C | site c dam
60 Gravelines
60 Topaz Solar Farm | topaz
60 Noor Ouarzazate | noor | ouarzazate
60 Alta Wind Energy Center | alta wind
85 Shippingport Atomic Power Station | shippingport
85 Obninsk | obninsk nuclear power plant
85 Calder Hall
85 Godalming
85 Holborn Viaduct power station | holborn viaduct
85 Ames Hydroelectric Plant | ames
100 Vulcan Street Plant | vulcan street
`);

const cables = p("hv-cables", "Name a type of cable or wire", `
10 Coaxial cable | coax
10 Ethernet cable | cat5 | cat5e | cat6 | network cable
10 Extension cord
10 USB cable
15 Twisted pair | utp | stp
15 Ribbon cable | flat cable
15 Speaker wire
15 Romex | nm cable | nmd90 | nm-b
15 Stranded wire | stranded
15 Solid-core wire | solid wire | solid core
15 Fibre optic | fiber optic | optical fiber
15 Power cord
15 HDMI cable
30 Magnet wire | enamelled wire | enameled wire
30 Litz wire | litz
30 Shielded cable
30 Armoured cable | armored cable | bx | teck cable | teck
30 THHN
30 Hookup wire | hook-up wire
30 Jumper wire | dupont wire
30 Zip cord | lamp cord
30 Twin-lead | ladder line | twin lead | window line
30 Heliax | hardline | hard line
30 Triax | triaxial
30 Twinax | twinaxial
30 MC cable | metal clad
30 SJOOW | portable cord | so cord
30 Flat flex cable | ffc | fpc
30 Wire-wrap wire | kynar
60 ACSR | aluminum conductor steel reinforced
60 Mineral-insulated cable | mi cable | micc | pyro
60 Silicone wire | silicone insulated
60 PTFE wire | teflon wire
60 Tinsel wire
60 Bell wire
60 Thermocouple wire
60 Submarine cable | subsea cable
60 Superconducting cable | hts cable
60 Leaky feeder
60 Welding cable
60 Messenger wire | messenger
60 Tray cable | tc cable
85 PILC | paper-insulated lead-covered
85 Oil-filled cable | fluid filled cable
85 Gutta-percha cable | gutta percha
85 SWER | single-wire earth return
100 Goubau line | g-line
`);

const lamps = p("hv-lamps", "Name a type of light bulb or lamp", `
10 Incandescent | incandescent bulb | edison bulb
10 LED | led bulb
10 Fluorescent | fluorescent tube | tube light
10 CFL | compact fluorescent
15 Halogen | tungsten halogen
15 Neon | neon sign | neon lamp
15 Black light | uv lamp | blacklight
15 Heat lamp | infrared lamp
30 Xenon arc lamp | xenon | hid | high intensity discharge
30 Metal halide
30 High-pressure sodium | hps | sodium vapor | sodium lamp
30 Low-pressure sodium | lps
30 Mercury vapour | mercury vapor
30 Krypton
30 Flash tube | xenon flash | strobe
30 Lava lamp
30 Plasma lamp | plasma globe
30 LED filament | filament led
30 Smart bulb
60 Induction lamp | electrodeless
60 Sulfur lamp | sulphur lamp
60 Carbon arc lamp | arc lamp
60 CCFL | cold cathode
60 Nernst lamp
60 Yablochkov candle | jablochkoff candle
60 Germicidal lamp | uvc lamp
60 Grow light
60 Limelight | calcium light
60 Deuterium lamp
60 Hollow cathode lamp
60 Excimer lamp
60 Laser
85 Moore lamp | moore tube
85 Carbon filament lamp | carbon filament
85 Tantalum lamp
85 Neodymium bulb | daylight bulb
85 Ceramic metal halide | cmh
100 Geissler tube | geissler
`);

export default {
  id: "high-voltage",
  name: "High Voltage",
  description: "Power conversion, the grid, your house and the lights that hang off it.",
  chapters: [
    [converters, motors, batteries, generation, protection, grid, home],
    [plugs, ev, transformer, blackouts, plants, cables, lamps],
  ],
};
