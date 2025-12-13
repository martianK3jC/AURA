import React, { useState } from 'react';
import { User, Monitor, AlertCircle, CheckCircle, Clock, Navigation, Utensils, Plane } from 'lucide-react';

const UserFlowDiagram = () => {
    const [activeScenario, setActiveScenario] = useState('normal');
    const [activeUser, setActiveUser] = useState('anna');
    const [travelDirection, setTravelDirection] = useState('departure');

    const FlowNode = ({ icon: Icon, title, description, color = "blue", type = "action" }) => (
        <div className={`relative ${type === 'decision' ? 'w-64' : 'w-56'}`}>
            <div className={`bg-${color}-50 border-2 border-${color}-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow`}>
                <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 text-${color}-600 flex-shrink-0 mt-0.5`} />
                    <div>
                        <h4 className={`font-semibold text-${color}-900 text-sm mb-1`}>{title}</h4>
                        <p className="text-xs text-gray-600">{description}</p>
                    </div>
                </div>
            </div>
            {type === 'decision' && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-blue-500"></div>
            )}
        </div>
    );

    const FlowArrow = ({ label = "", vertical = true }) => (
        <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} items-center justify-center ${vertical ? 'my-2' : 'mx-2'}`}>
            <div className={`${vertical ? 'h-8 w-0.5' : 'w-8 h-0.5'} bg-gray-400`}></div>
            {label && (
                <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded">{label}</span>
            )}
        </div>
    );

    const annaArrivalFlow = (
        <div className="flex flex-col items-center space-y-2 py-6">
            <div className="bg-green-100 border-2 border-green-600 rounded-full px-6 py-3 font-bold text-green-900">
                START: Anna's Arrival (Airplane → MCIA → Destination)
            </div>

            <FlowArrow />

            <FlowNode
                icon={Plane}
                title="Landing Notification"
                description="'Welcome to Cebu! Estimated time to baggage claim: 12 mins'"
                color="blue"
            />

            <FlowArrow />

            <FlowNode
                icon={Navigation}
                title="Baggage & Immigration Timeline"
                description="Real-time wait estimates → Immigration (8min), Baggage (5min)"
                color="purple"
            />

            <FlowArrow />

            <FlowNode
                icon={User}
                title="Destination Input"
                description="'Where are you headed?' → Hotel/Address in Lapu-Lapu, Cebu City, or Mandaue"
                color="green"
                type="decision"
            />

            <FlowArrow />

            <FlowNode
                icon={Navigation}
                title="Vehicle Recommendations"
                description="Options: Grab, Taxi, Hotel Shuttle, Private Transfer with ETA & pricing"
                color="blue"
            />

            <FlowArrow />

            <FlowNode
                icon={Clock}
                title="Journey Planning"
                description="'Travel time to Shangri-La Mactan: 18 mins' → Live traffic updates"
                color="orange"
            />

            <FlowArrow />

            <FlowNode
                icon={Utensils}
                title="En Route Suggestions (Optional)"
                description="'Hungry? Recommended stops: Lechon house (5min detour), nearby restaurants'"
                color="pink"
            />

            <FlowArrow />

            <FlowNode
                icon={CheckCircle}
                title="Pickup Coordination"
                description="'Your Grab is 3 mins away at Arrival Zone B' → Live driver tracking"
                color="green"
            />

            <FlowArrow />

            <div className="bg-green-600 text-white rounded-full px-6 py-3 font-bold">
                ✓ EN ROUTE TO DESTINATION
            </div>
        </div>
    );

    const annaNormalFlow = (
        <div className="flex flex-col items-center space-y-2 py-6">
            <div className="bg-purple-100 border-2 border-purple-600 rounded-full px-6 py-3 font-bold text-purple-900">
                START: Anna's Departure (Normal Day)
            </div>

            <FlowArrow />

            <FlowNode
                icon={User}
                title="Opens MCIA Navigator App"
                description="Enters flight number → AURA analyzes weather, traffic, flight schedule, congestion"
                color="purple"
            />

            <FlowArrow />

            <FlowNode
                icon={Clock}
                title="Receives Travel Timeline"
                description="Recommended leave time, ETA at airport, estimated time to gate"
                color="blue"
            />

            <FlowArrow />

            <FlowNode
                icon={Navigation}
                title="Chooses Transportation"
                description="Selects Grab/Taxi/Private Car → App recalculates ETA based on traffic"
                color="green"
                type="decision"
            />

            <FlowArrow />

            <FlowNode
                icon={AlertCircle}
                title="Drop-Off Optimization"
                description="AURA suggests: 'East Wing busy, use West Wing instead'"
                color="orange"
            />

            <FlowArrow label="Arriving Early?" />

            <FlowNode
                icon={Utensils}
                title="Pre-Arrival Recommendations"
                description="Option to pre-book meal/lounge with ratings & walk times"
                color="pink"
            />

            <FlowArrow />

            <div className="bg-green-100 border-2 border-green-600 rounded-lg px-6 py-3 font-bold text-green-900">
                ARRIVAL AT MCIA
            </div>

            <FlowArrow />

            <FlowNode
                icon={Navigation}
                title="Welcome + Journey Timeline"
                description="'Welcome Anna! 40 mins to gate' → Color-coded timeline shown"
                color="purple"
            />

            <FlowArrow />

            <FlowNode
                icon={CheckCircle}
                title="Check-In → Security"
                description="Real-time wait times: Check-in (7min), Security (8min)"
                color="blue"
            />

            <FlowArrow />

            <FlowNode
                icon={Utensils}
                title="Free Time Recommendations"
                description="AURA suggests restaurants with menus, ratings, dining time estimates"
                color="pink"
            />

            <FlowArrow label="While Dining" />

            <FlowNode
                icon={Clock}
                title="Smart Monitoring"
                description="AURA tracks queue changes + walking time, alerts when to leave"
                color="orange"
            />

            <FlowArrow />

            <FlowNode
                icon={Plane}
                title="Boarding Notification"
                description="'Time to head to Gate 12' → Auto-updates if gate changes"
                color="green"
            />

            <FlowArrow />

            <div className="bg-green-600 text-white rounded-full px-6 py-3 font-bold">
                ✓ SMOOTH BOARDING
            </div>
        </div>
    );

    const annaDelayedFlow = (
        <div className="flex flex-col items-center space-y-2 py-6">
            <div className="bg-red-100 border-2 border-red-600 rounded-full px-6 py-3 font-bold text-red-900">
                START: Anna's Departure (Delayed Day)
            </div>

            <FlowArrow />

            <FlowNode
                icon={AlertCircle}
                title="Proactive Delay Notification"
                description="'Flight PR235 delayed 48 mins. You can leave later' (sent to hotel)"
                color="red"
            />

            <FlowArrow />

            <FlowNode
                icon={Clock}
                title="Adjust Travel Plans"
                description="Option to adjust ride pickup time + 'Relax Mode' itinerary"
                color="orange"
                type="decision"
            />

            <FlowArrow />

            <div className="bg-orange-100 border-2 border-orange-600 rounded-lg px-6 py-3 font-bold text-orange-900">
                ARRIVAL AT MCIA (Anxious)
            </div>

            <FlowArrow />

            <FlowNode
                icon={AlertCircle}
                title="Calming Reassurance"
                description="'Security wait: 27 min. Don't worry—gate is 90 mins away'"
                color="purple"
            />

            <FlowArrow />

            <FlowNode
                icon={Utensils}
                title="Dynamic Decision Support"
                description="If Anna eats, AURA continuously tracks location + queue changes"
                color="pink"
            />

            <FlowArrow label="Queue Drops" />

            <FlowNode
                icon={CheckCircle}
                title="Opportunity Alert"
                description="'Security wait now only 12 minutes if you leave now'"
                color="green"
            />

            <FlowArrow />

            <FlowNode
                icon={AlertCircle}
                title="Major Disruption (Optional)"
                description="Typhoon alert: 'Flight may be cancelled. Confirmation in 10 mins'"
                color="red"
            />

            <FlowArrow />

            <FlowNode
                icon={Plane}
                title="Gate Change Handling"
                description="'Gate changed to 16. Walking time: 5 minutes' → Auto-reroute"
                color="blue"
            />

            <FlowArrow />

            <div className="bg-green-600 text-white rounded-full px-6 py-3 font-bold">
                ✓ BOARDING (Despite Chaos)
            </div>
        </div>
    );

    const davidNormalFlow = (
        <div className="flex flex-col items-center space-y-2 py-6">
            <div className="bg-blue-100 border-2 border-blue-600 rounded-full px-6 py-3 font-bold text-blue-900">
                START: David's AOCC Dashboard (Normal Day)
            </div>

            <FlowArrow />

            <FlowNode
                icon={Monitor}
                title="Dashboard Login"
                description="Live airport heatmap displayed → All zones GREEN"
                color="green"
            />

            <FlowArrow />

            <FlowNode
                icon={CheckCircle}
                title="Predictive Status Check"
                description="'No incidents forecasted in next 60 minutes'"
                color="blue"
            />

            <FlowArrow />

            <FlowNode
                icon={AlertCircle}
                title="Queue Predictions"
                description="3 overlapping flight check-ins detected → Still manageable"
                color="yellow"
            />

            <FlowArrow />

            <FlowNode
                icon={CheckCircle}
                title="Staffing Recommendation"
                description="'Maintain 4 lanes at Domestic Security' → 40% capacity"
                color="green"
            />

            <FlowArrow />

            <FlowNode
                icon={Monitor}
                title="Auto-Reporting"
                description="AURA auto-logs operational data for shift report"
                color="blue"
            />

            <FlowArrow />

            <div className="bg-green-600 text-white rounded-full px-6 py-3 font-bold">
                ✓ SMOOTH OPERATIONS
            </div>
        </div>
    );

    const davidDelayedFlow = (
        <div className="flex flex-col items-center space-y-2 py-6">
            <div className="bg-red-100 border-2 border-red-600 rounded-full px-6 py-3 font-bold text-red-900">
                START: David's AOCC Dashboard (Delayed Day)
            </div>

            <FlowArrow />

            <FlowNode
                icon={AlertCircle}
                title="CRITICAL ALERT"
                description="'High-risk congestion at Intl Security in 25 mins' → Overlapping departures"
                color="red"
            />

            <FlowArrow />

            <FlowNode
                icon={Monitor}
                title="Visual Escalation"
                description="Heatmaps turn YELLOW → ORANGE → Occupancy spike forecast shown"
                color="orange"
            />

            <FlowArrow />

            <FlowNode
                icon={CheckCircle}
                title="AI Recommendation"
                description="'Deploy 2 additional guards to Lane 3' → David taps ACCEPT"
                color="blue"
                type="decision"
            />

            <FlowArrow />

            <FlowNode
                icon={CheckCircle}
                title="Staff Assignment"
                description="Staff app receives assignment instantly → Guards dispatched"
                color="green"
            />

            <FlowArrow />

            <FlowNode
                icon={Monitor}
                title="Impact Tracking"
                description="AURA logs: 'Prevented potential 40-min queue escalation'"
                color="blue"
            />

            <FlowArrow label="If Major Disruption" />

            <FlowNode
                icon={AlertCircle}
                title="Disaster Protocol"
                description="Typhoon trigger → 'Escalate to Communication Protocol Level 2'"
                color="red"
            />

            <FlowArrow />

            <FlowNode
                icon={Monitor}
                title="Crisis Management"
                description="Staff instructions, flow changes, rebooking lists generated"
                color="purple"
            />

            <FlowArrow />

            <div className="bg-green-600 text-white rounded-full px-6 py-3 font-bold">
                ✓ CRISIS AVERTED
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">AURA User Flow Diagrams</h1>
                    <p className="text-gray-600">AI-Powered Unified Resource Assistant for MCIA</p>
                </div>

                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => setActiveUser('anna')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeUser === 'anna'
                            ? 'bg-purple-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <User className="w-5 h-5 inline mr-2" />
                        Anna (Passenger)
                    </button>
                    <button
                        onClick={() => setActiveUser('david')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeUser === 'david'
                            ? 'bg-blue-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Monitor className="w-5 h-5 inline mr-2" />
                        David (Operator)
                    </button>
                </div>

                {activeUser === 'anna' && (
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            onClick={() => setTravelDirection('departure')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${travelDirection === 'departure'
                                ? 'bg-purple-600 text-white shadow-lg scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Plane className="w-5 h-5 inline mr-2 transform rotate-45" />
                            To Airport (Departure)
                        </button>
                        <button
                            onClick={() => setTravelDirection('arrival')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${travelDirection === 'arrival'
                                ? 'bg-green-600 text-white shadow-lg scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Plane className="w-5 h-5 inline mr-2 transform -rotate-45" />
                            From Airport (Arrival)
                        </button>
                    </div>
                )}

                {((activeUser === 'anna' && travelDirection === 'departure') || activeUser === 'david') && (
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => setActiveScenario('normal')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeScenario === 'normal'
                                ? 'bg-green-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <CheckCircle className="w-5 h-5 inline mr-2" />
                            Normal Operations
                        </button>
                        <button
                            onClick={() => setActiveScenario('delayed')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeScenario === 'delayed'
                                ? 'bg-red-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <AlertCircle className="w-5 h-5 inline mr-2" />
                            Delayed/Disrupted
                        </button>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-xl p-8 overflow-x-auto">
                    {activeUser === 'anna' && travelDirection === 'arrival' && annaArrivalFlow}
                    {activeUser === 'anna' && travelDirection === 'departure' && activeScenario === 'normal' && annaNormalFlow}
                    {activeUser === 'anna' && travelDirection === 'departure' && activeScenario === 'delayed' && annaDelayedFlow}
                    {activeUser === 'david' && activeScenario === 'normal' && davidNormalFlow}
                    {activeUser === 'david' && activeScenario === 'delayed' && davidDelayedFlow}
                </div>

                <div className="mt-8 bg-white rounded-lg shadow p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Flow Legend</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-purple-500 rounded"></div>
                            <span>User Action</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span>System Response</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span>Success State</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span>Alert/Critical</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserFlowDiagram;