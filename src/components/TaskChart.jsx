import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const size = {
    width: 250,
    height: 175,
};

export default function TaskChart() {
    // State for chart data
    const [chartData, setChartData] = useState([
        { value: 0 }, // Completed tasks
        { value: 0 }, // Incomplete tasks
    ]);

    // Access tasks from Redux store
    const allTask = useSelector((state) => state.tasks.tasks);

    useEffect(() => {
        // Initialize counters
        let completed = 0;
        let incomplete = 0;

        // Count completed and incomplete tasks
        allTask.forEach((task) => {
            if (task.completed) {
                completed++;
            } else {
                incomplete++;
            }
        });

        // Update chart data state
        setChartData([
            { value: completed },
            { value: incomplete },
        ]);
    }, [allTask]);

    const color = ['#142E15', '#3F9142']

    return (
        <PieChart
            series={[{ data: chartData, innerRadius: 50 }]}
            {...size}
            colors={color}
        />
    );
}
