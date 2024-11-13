import React, { Component, useState, useEffect } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import DataVisualization from './components/DataVisualization';

import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path='/data-visualization' component={DataVisualization} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}

// DataVisualization.js component
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const DataVisualization = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Fetch data from the Python backend (e.g., through an API endpoint)
        fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                setChartData({
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Data from Python',
                            data: data.values,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderWidth: 2,
                        },
                    ],
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2>Data Visualization</h2>
            {chartData ? (
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            ) : (
                    <p>Loading...</p>
                )}
        </div>
    );
};

export default DataVisualization;
