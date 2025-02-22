import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';

// Define types
type Transportation = {
  distance: number;
  mode: keyof typeof emissionFactors; // Ensures mode is a valid key
};

type DailyLog = {
  date: string;
  transportation: Transportation;
  electricityUsage: number;
  wasteGenerated: number;
};

type EmissionData = {
  category: string;
  value: number;
};

// Emission factors (kg CO₂ per unit)
const emissionFactors = {
  car: 0.2, // per km
  bus: 0.1,
  bike: 0,
  electricity: 0.5, // per kWh
  waste: 0.1, // per kg
};

// Sample data for testing
const sampleDailyLogs: DailyLog[] = [
  { date: '2023-10-01', transportation: { distance: 10, mode: 'car' }, electricityUsage: 5, wasteGenerated: 2 },
  { date: '2023-10-02', transportation: { distance: 5, mode: 'bus' }, electricityUsage: 4, wasteGenerated: 1 },
  { date: '2023-10-03', transportation: { distance: 20, mode: 'bike' }, electricityUsage: 3, wasteGenerated: 0 },
  { date: '2023-10-04', transportation: { distance: 15, mode: 'car' }, electricityUsage: 6, wasteGenerated: 3 },
  { date: '2023-10-05', transportation: { distance: 8, mode: 'bus' }, electricityUsage: 5, wasteGenerated: 2 },
  { date: '2023-10-06', transportation: { distance: 12, mode: 'car' }, electricityUsage: 7, wasteGenerated: 1 },
  { date: '2023-10-07', transportation: { distance: 3, mode: 'bike' }, electricityUsage: 4, wasteGenerated: 0 },
];

const DailyTrackingAndStats = () => {
  const [transportation, setTransportation] = useState<Transportation>({ distance: 0, mode: 'car' });
  const [electricityUsage, setElectricityUsage] = useState(0);
  const [wasteGenerated, setWasteGenerated] = useState(0);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>(sampleDailyLogs);

  // Calculate daily emissions
  const calculateDailyEmissions = (log: DailyLog) => {
    const transportationEmission = log.transportation.distance * emissionFactors[log.transportation.mode];
    const electricityEmission = log.electricityUsage * emissionFactors.electricity;
    const wasteEmission = log.wasteGenerated * emissionFactors.waste;
    return transportationEmission + electricityEmission + wasteEmission;
  };

  // Log daily data
  const logDailyData = () => {
    const newLog: DailyLog = {
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      transportation,
      electricityUsage,
      wasteGenerated,
    };
    setDailyLogs([...dailyLogs, newLog]);
  };

  // Calculate total emissions saved
  const totalEmissionsSaved = dailyLogs.reduce((sum, log) => sum + calculateDailyEmissions(log), 0);

  // Breakdown of emissions by category
  const emissionsByCategory: EmissionData[] = [
    { category: 'Transportation', value: dailyLogs.reduce((sum, log) => sum + log.transportation.distance * emissionFactors[log.transportation.mode], 0) },
    { category: 'Energy', value: dailyLogs.reduce((sum, log) => sum + log.electricityUsage * emissionFactors.electricity, 0) },
    { category: 'Waste', value: dailyLogs.reduce((sum, log) => sum + log.wasteGenerated * emissionFactors.waste, 0) },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Daily Log Form */}
      <Text style={styles.title}>Daily Log</Text>
      <Text>Transportation:</Text>
      <TextInput
        placeholder="Distance (km)"
        value={transportation.distance.toString()}
        onChangeText={(text) => setTransportation({ ...transportation, distance: parseFloat(text) || 0 })}
        keyboardType="numeric"
        style={styles.input}
      />
      <Picker
        selectedValue={transportation.mode}
        onValueChange={(itemValue) => setTransportation({ ...transportation, mode: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Car" value="car" />
        <Picker.Item label="Bus" value="bus" />
        <Picker.Item label="Bike" value="bike" />
      </Picker>

      <Text>Electricity Usage (kWh):</Text>
      <TextInput
        placeholder="Electricity Usage"
        value={electricityUsage.toString()}
        onChangeText={(text) => setElectricityUsage(parseFloat(text) || 0)}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Waste Generated (kg):</Text>
      <TextInput
        placeholder="Waste Generated"
        value={wasteGenerated.toString()}
        onChangeText={(text) => setWasteGenerated(parseFloat(text) || 0)}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Log Daily Data" onPress={logDailyData} />

      {/* Statistics */}
      <Text style={styles.title}>Your Carbon Footprint</Text>

      {/* Weekly Emission Trends */}
      <Text style={styles.sectionTitle}>Weekly Emission Trends</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: dailyLogs.slice(-7).map((log) => log.date),
            datasets: [{ data: dailyLogs.slice(-7).map((log) => calculateDailyEmissions(log)) }],
          }}
          width={Dimensions.get('window').width - 32} // Adjust width to fit container
          height={220}
          chartConfig={{
            backgroundColor: '#B2F2BB',
            backgroundGradientFrom: '#B2F2BB',
            backgroundGradientTo: '#C7F9CC',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(45, 106, 79, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>

      {/* Total Emissions Saved */}
      <Text style={styles.sectionTitle}>Total Emissions Saved</Text>
      <Text style={styles.statValue}>{totalEmissionsSaved.toFixed(2)} kg CO₂</Text>

      {/* Breakdown of Emissions by Category */}
      <Text style={styles.sectionTitle}>Breakdown by Category</Text>
      {emissionsByCategory.map((item, index) => (
        <View key={index} style={styles.statItem}>
          <Text style={styles.statLabel}>{item.category}</Text>
          <Text style={styles.statValue}>{item.value.toFixed(2)} kg CO₂</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F0FFF1', // Light pastel green background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D6A4F', // Dark green
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D6A4F',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  chart: {
    borderRadius: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default DailyTrackingAndStats;