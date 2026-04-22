import React, { useEffect, useRef } from 'react';

export const SimpleChart = ({ data, color = '#00D1FF' }) => {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas || !data || data.length < 2) return;

        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        const prices = data.map(d => d.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const range = max - min || 1;

        // Fill area under line
        ctx.fillStyle = color + '20';
        ctx.beginPath();
        ctx.moveTo(0, h);
        data.forEach((d, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - ((d.price - min) / range) * h * 0.8 - h * 0.1;
            ctx.lineTo(x, y);
        });
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();

        // Draw line
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        data.forEach((d, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - ((d.price - min) / range) * h * 0.8 - h * 0.1;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
    }, [data, color]);

    return <canvas ref={ref} width={500} height={200} className="w-full h-full" />;
};