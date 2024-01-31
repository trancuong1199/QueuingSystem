const dashboard0 = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
        {
            label: 'Lượt khám bệnh',
            data: [2200, 4000, 4300, 4000, 3300, 3900, 3700, 4100, 3800, 4100, 4221, 3800],
            borderColor: '#5185F7',
            backgroundColor: ['rgba(206, 221, 255, 0.3)'],
            tension: 0.4,
            fill: true,
        },
    ],
    numberCreated: 4.221,
    numberCreatedPer: 32.41,
    numberUsed: 3.721,
    numberUsedPer: 25.2,
    numberWaited: 468,
    numberWaitedPer: 59.9,
    numberCancled: 32,
    numberCancledPer: 11.1,
    day: 'Ngày 11',
};

const dashboard1 = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
        {
            label: 'Lượt khám bệnh',
            data: [100, 3000, 5000, 2000, 3552, 2000, 3700, 4100, 3800, 5000, 2000, 4000],
            borderColor: '#5185F7',
            backgroundColor: ['rgba(206, 221, 255, 0.3)'],
            tension: 0.4,
            fill: true,
        },
    ],
    numberCreated: 2.221,
    numberCreatedPer: 30.41,
    numberUsed: 5.721,
    numberUsedPer: 40.2,
    numberWaited: 1025,
    numberWaitedPer: 11.9,
    numberCancled: 200,
    numberCancledPer: 22.1,
    day: 'Tháng 11',
};

const dashboard2 = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
        {
            label: 'Lượt khám bệnh',
            data: [5000, 1000, 2000, 5000, 2000, 3900, 500, 4000, 5500, 4100, 2000, 5000],
            borderColor: '#5185F7',
            backgroundColor: ['rgba(206, 221, 255, 0.3)'],
            tension: 0.4,
            fill: true,
        },
    ],
    numberCreated: 1.221,
    numberCreatedPer: 80.41,
    numberUsed: 5.721,
    numberUsedPer: 50.2,
    numberWaited: 1468,
    numberWaitedPer: 25.9,
    numberCancled: 3000,
    numberCancledPer: 29.1,
    day: 'Năm 2024',
};

const options = {
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            min: 0,
            max: 6000,
            ticks: {
                stepSize: 1000,
            },
        },
    },
};

const dummyData = {
    dashboard0,
    dashboard1,
    dashboard2,
    options,
};

export default dummyData;
