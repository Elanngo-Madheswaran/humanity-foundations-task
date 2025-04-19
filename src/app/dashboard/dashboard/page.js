'use client';
import React from 'react';
import { useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {


    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const [timeFilter, setTimeFilter] = useState('Last 6 months');

    // Mock data for charts
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Performance',
                data: [30, 40, 35, 50, 45, 60],
                borderColor: '#4169e1',
                backgroundColor: 'rgba(65, 105, 225, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const doughnutData = {
        labels: ['Successful', 'Failed'],
        datasets: [
            {
                data: [67, 33],
                backgroundColor: ['#8884d8', '#d3d3d3'],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="dashboard-container p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <div className="user-profile flex items-center">
                    <span className="mr-2">Kadin Bronson</span>
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="stat-card bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 rounded-full bg-gray-100 mr-3">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" stroke="black" strokeWidth="2" />
                                <path d="M20 21C20 16.58 16.42 13 12 13C7.58 13 4 16.58 4 21" stroke="black" strokeWidth="2" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Promoters</p>
                            <p className="text-xl font-bold">1,234</p>
                        </div>
                    </div>
                </div>

                <div className="stat-card bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 rounded-full bg-red-50 mr-3">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#FF6B6B" strokeWidth="2" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Conversion Rate</p>
                            <p className="text-xl font-bold">23.5%</p>
                        </div>
                    </div>
                </div>

                <div className="stat-card bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 rounded-full bg-pink-50 mr-3">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="#E84393" strokeWidth="2" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Revenue Generated</p>
                            <p className="text-xl font-bold">$12,345</p>
                        </div>
                    </div>
                </div>

                <div className="stat-card bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 rounded-full bg-blue-50 mr-3">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="#4299E1" strokeWidth="2" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active Campaigns</p>
                            <p className="text-xl font-bold">3</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI Circles */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="kpi-card bg-white p-4 rounded-lg shadow-sm text-center">
                    <h3 className="text-sm mb-2">Repeat Referral Rate</h3>
                    <div className="w-24 h-24 mx-auto relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-green-500">33%</span>
                        </div>
                        <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EEEEEE" strokeWidth="3" />
                            <path className="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4CD964" strokeWidth="3" strokeDasharray="33, 100" />
                        </svg>
                    </div>
                </div>

                <div className="kpi-card bg-white p-4 rounded-lg shadow-sm text-center">
                    <h3 className="text-sm mb-2">Referral Engagement Rate</h3>
                    <div className="w-24 h-24 mx-auto relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-orange-500">45%</span>
                        </div>
                        <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EEEEEE" strokeWidth="3" />
                            <path className="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FF9500" strokeWidth="3" strokeDasharray="45, 100" />
                        </svg>
                    </div>
                </div>

                <div className="kpi-card bg-white p-4 rounded-lg shadow-sm text-center">
                    <h3 className="text-sm mb-2">Churn Rate of Leads</h3>
                    <div className="w-24 h-24 mx-auto relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-blue-500">25%</span>
                        </div>
                        <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EEEEEE" strokeWidth="3" />
                            <path className="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#007AFF" strokeWidth="3" strokeDasharray="25, 100" />
                        </svg>
                    </div>
                </div>

                <div className="kpi-card bg-white p-4 rounded-lg shadow-sm text-center">
                    <h3 className="text-sm mb-2">Upsell Rate of Leads</h3>
                    <div className="w-24 h-24 mx-auto relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-purple-500">15%</span>
                        </div>
                        <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EEEEEE" strokeWidth="3" />
                            <path className="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#C644FC" strokeWidth="3" strokeDasharray="15, 100" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="chart-card bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Promoter Performance Over Time</h3>
                        <select 
                            className="text-sm border rounded p-1"
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                        >
                            <option>Last 6 months</option>
                            <option>Last 12 months</option>
                            <option>This year</option>
                        </select>
                    </div>
                    <div className="h-64">
                        <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                <div className="chart-card bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-4">Conversion Success Rate</h3>
                    <div className="flex items-center justify-between">
                        <div className="w-40 h-40">
                            <Doughnut data={doughnutData} options={{ cutout: '70%', maintainAspectRatio: true }} />
                        </div>
                        <div className="legend">
                            <div className="flex items-center mb-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                <span className="text-sm">Successful over 67%</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                                <span className="text-sm">Remaining 33%</span>
                            </div>
                        </div>
                    </div>
                    <div className="channel-stats grid grid-cols-3 gap-2 mt-4">
                        <div className="bg-pink-100 p-2 rounded text-center">
                            <p className="text-sm">Email</p>
                            <p className="font-bold">78%</p>
                        </div>
                        <div className="bg-blue-100 p-2 rounded text-center">
                            <p className="text-sm">LinkedIn</p>
                            <p className="font-bold">45%</p>
                        </div>
                        <div className="bg-yellow-100 p-2 rounded text-center">
                            <p className="text-sm">Call</p>
                            <p className="font-bold">23%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h3 className="font-medium mb-4">Recent Activities</h3>
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-500 text-sm">
                            <th className="pb-2">Activities</th>
                            <th className="pb-2">Date</th>
                            <th className="pb-2">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="py-3">Action record #10</td>
                            <td>28-4-2024</td>
                            <td>10:30 AM</td>
                        </tr>
                        <tr className="border-t">
                            <td className="py-3">John Doe signed up from your referral link</td>
                            <td>28-4-2024</td>
                            <td>9:45 AM</td>
                        </tr>
                        <tr className="border-t">
                            <td className="py-3">You received 25 referrals milestone</td>
                            <td>28-4-2024</td>
                            <td>9:20 AM</td>
                        </tr>
                        <tr className="border-t">
                            <td className="py-3">You updated your referral campaign</td>
                            <td>27-4-2024</td>
                            <td>7:55 AM</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-4">Leaderboard Table View</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-500 text-sm">
                                <th className="pb-2">Rank</th>
                                <th className="pb-2">Promoter Name</th>
                                <th className="pb-2">Connection Rate</th>
                                <th className="pb-2">Referrals Sent</th>
                                <th className="pb-2">Successful Conversions</th>
                                <th className="pb-2">Revenue Generated</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="py-2">1</td>
                                <td>Emery Drillick</td>
                                <td>70%</td>
                                <td>80</td>
                                <td>50%</td>
                                <td>$1,200</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2">2</td>
                                <td>Kadin Gunner</td>
                                <td>63%</td>
                                <td>90</td>
                                <td>45%</td>
                                <td>$980</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2">3</td>
                                <td>Randy Sullivan</td>
                                <td>68%</td>
                                <td>65</td>
                                <td>40%</td>
                                <td>$860</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2">4</td>
                                <td>Jensen Newman</td>
                                <td>50%</td>
                                <td>55</td>
                                <td>35%</td>
                                <td>$650</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2">5</td>
                                <td>Joseph Lewis</td>
                                <td>55%</td>
                                <td>30</td>
                                <td>43%</td>
                                <td>$540</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2">6</td>
                                <td>Martin Martinez</td>
                                <td>62%</td>
                                <td>28</td>
                                <td>25%</td>
                                <td>$320</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2">7</td>
                                <td>Wayne Stark</td>
                                <td>72%</td>
                                <td>35</td>
                                <td>48%</td>
                                <td>$710</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2">8</td>
                                <td>Barry Howard</td>
                                <td>54%</td>
                                <td>40</td>
                                <td>30%</td>
                                <td>$560</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                .circular-chart {
                    width: 100%;
                    height: 100%;
                }
                .circle {
                    stroke-linecap: round;
                    transition: stroke-dasharray 0.5s ease;
                }
            `}</style>
        </div>
    );
}