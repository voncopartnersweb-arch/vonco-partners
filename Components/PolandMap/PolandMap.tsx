type CityKey = 'warsaw' | 'krakow' | 'wroclaw' | 'poznan' | 'gdansk' | 'lodz';

type Props = {
  activeCities: CityKey[];
};

const cities = {
  warsaw: { x: 310, y: 160, label: 'Warszawa' },
  krakow: { x: 300, y: 280, label: 'Kraków' },
  wroclaw: { x: 200, y: 260, label: 'Wrocław' },
  poznan: { x: 220, y: 190, label: 'Poznań' },
  gdansk: { x: 260, y: 90, label: 'Gdańsk' },
  lodz: { x: 270, y: 210, label: 'Łódź' },
};

export function PolandMap({ activeCities }: Props) {
  return (
    <svg
      viewBox='0 0 500 400'
      width='100%'
      height='auto'
      style={{ maxWidth: 500 }}
    >
      {/* MAPA (спрощений контур) */}
      <path
        d='M120 80 L380 80 L430 180 L360 330 L200 350 L90 240 Z'
        fill='#1a1a1a'
        stroke='#333'
        strokeWidth={2}
      />

      {/* МІСТА */}
      {Object.entries(cities).map(([key, city]) => {
        const active = activeCities.includes(key as CityKey);

        return (
          <g key={key}>
            <circle
              cx={city.x}
              cy={city.y}
              r={active ? 9 : 6}
              fill={active ? '#ff0000' : '#666'}
            />
            {active && (
              <text
                x={city.x}
                y={city.y - 14}
                fill='#fff'
                fontSize='12'
                textAnchor='middle'
              >
                {city.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
