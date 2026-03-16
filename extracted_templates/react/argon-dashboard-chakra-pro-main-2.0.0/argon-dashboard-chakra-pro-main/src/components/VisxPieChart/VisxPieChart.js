import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { useColorModeValue } from "@chakra-ui/react";

const VisxPieChart = ({ data, title, width }) => {
  const [active, setActive] = useState(null);
  const half = width / 2;

  const textColor = useColorModeValue("gray.700", "white");

  return (
    <svg width={width} height={width}>
      <Group top={half} left={half}>
        <Pie
          data={data}
          pieValue={(data) => data.percentage}
          outerRadius={half}
          innerRadius={({ data }) => {
            const size = active && active.name == data.name ? 12 : 8;
            return half - size;
          }}
          padAngle={0.01}
        >
          {(pie) => {
            return pie.arcs.map((arc) => {
              return (
                <g
                  key={arc.data.name}
                  onMouseEnter={() => setActive(arc.data)}
                  onMouseLeave={() => setActive(null)}
                >
                  <path d={pie.path(arc)} fill={arc.data.color}></path>
                </g>
              );
            });
          }}
        </Pie>


        <>


          <Text textAnchor="middle" fill={textColor} fontWeight="bold" fontSize={32} dy={20}>
            {title}
          </Text>
        </>

      </Group>
    </svg>
  );
};

export default VisxPieChart;
