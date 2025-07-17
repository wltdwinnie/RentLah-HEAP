import { MRTLine } from "./definition";
import { MRT_LINES } from "./constants";
import { MRTInfo } from "./definition";

export function transformMRTLinesFromDB(
  mrts: Array<{
    name: string;
    line: string | string[];
    distance: number;
  }>
): MRTInfo[] {
  return mrts
    .map((mrt) => {
      let lineStrings: string[];
      if (Array.isArray(mrt.line)) {
        lineStrings = mrt.line;
      } else {
        try {
          lineStrings = JSON.parse(mrt.line);
        } catch {
          lineStrings = mrt.line.split(",").map((l) => l.trim());
        }
      }
      const validLines = lineStrings.filter((line): line is MRTLine =>
        MRT_LINES.includes(line as MRTLine)
      );
      if (validLines.length === 0) {
        console.warn(`MRT station ${mrt.name} has no valid MRT lines`);
        return null;
      }
      return {
        name: mrt.name,
        line: validLines as [MRTLine, ...MRTLine[]],
        distance: mrt.distance,
      };
    })
    .filter(Boolean) as MRTInfo[]; // Remove nulls
}

export function transformMRTLinesForDB(mrtInfo: MRTInfo[]): Array<{
  name: string;
  line: string[];
  distance: number;
}> {
  return mrtInfo.map((mrt) => ({
    name: mrt.name,
    line: mrt.line,
    distance: mrt.distance,
  }));
}
