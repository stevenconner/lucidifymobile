import React from 'react';

import { View, Text, StyleSheet, Platform } from 'react-native';
import { Header, Separator } from '../components/common';
import { SafeAreaView } from 'react-navigation';
import * as STYLES from '../styles';
import Chart from '../components/ChartComponent';

class TrendsScreen extends React.Component {
    render() {
        let chartDatasets = [
            {
                data: [9, 10, 5, 14, 10, 17, 16, 8, 11, 4, 11, 10], label: 'Positive Sentiment',
                backgroundColor: 'rgba(151,187,205,0.2)',
                borderColor: 'rgba(151,187,205,1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(151,187,205,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(151,187,205,1)'
            },
            {
                data: [1, 1, 6, 4, 6, 4, 1, 4, 3, 1, 3, 15], label: 'Negative Sentiment',
                backgroundColor: 'rgba(220,220,220,0.2)',
                borderColor: 'rgba(220,220,220,1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(220,220,220,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(220,220,220,1)'
            }
        ];
        let chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const chartData = this.props.chartData;
        const chartConfiguration = {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: chartDatasets,
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: 30,
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 28,
                        }
                    }]
                },
                legend: {
                    labels: {
                        fontSize: 32,
                    }
                },
                title: {
                    text: 'Sentiment Over Time',
                    display: true,
                    fontSize: 40,
                    padding: 20,
                },
                tooltips: {
                    titleFontSize: 30,
                    bodyFontSize: 30,
                    titleMarginBottom: 20,
                    yPadding: 20,
                    xPadding: 20,
                }
            }
        }
        const androidChartConfiguration = {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: chartDatasets,
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                },
                title: {
                    text: 'Sentiment Over Time',
                    display: true,
                }
            }
        }
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerStyle}>
                    <Header
                        // leftIconName={'md-arrow-back'}
                        // leftIconType={'ionicon'}
                        // leftPress={() => this.props.navigation.goBack()}
                        rightPress={() => this.props.navigation.navigate('SettingsScreen')}
                    />
                    <View style={styles.contentContainer}>
                        <Text style={styles.titleText}>
                            Entries
                        </Text>
                        <Separator />
                        <View style={styles.chartContainer}>
                            <Chart
                                chartConfiguration={(Platform.OS === 'android') ? androidChartConfiguration : chartConfiguration}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: STYLES.SAFEAREA_STYLE,
    containerStyle: STYLES.CONTAINER_STYLE,
    contentContainer: STYLES.CONTENT_CONTAINER_STYLE,
    chartContainer: {
        height: 200,
    },
    titleText: {
        color: STYLES.TEXT_COLOR,
        fontSize: 23,
        fontFamily: 'Roboto',
    }
})

export default TrendsScreen;