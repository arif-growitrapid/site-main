export function formatNumbers(likes: number): string {
    const suffixes: string[] = ["", "K", "M", "B", "T"];
    const num: number = parseFloat(likes.toString());
  
    if (num < 1000) {
      return num.toString();
    }
  
    const tier: number = Math.floor(Math.log10(Math.abs(num)) / 3);
    const suffix: string = suffixes[Math.min(tier, suffixes.length - 1)]; // Choose suffix based on tier, preventing array index overflow
    const scale: number = Math.pow(10, tier * 3);
  
    const scaledNumber: number = num / scale;
    const formattedNumber: string = scaledNumber.toFixed(1).replace(/\.0$/, ""); // Remove '.0' for whole numbers
  
    return formattedNumber + suffix;
  }
  
  
export function parseNumbers(likesString: string): number {
    const suffixes: string[] = ["", "K", "M", "B", "T"];

    const match = likesString.match(/([\d.]+)([KMBT]?)/);
    if (!match) {
        throw new Error(`Invalid likes string: ${likesString}`);
    }

    const num: number = parseFloat(match[1]);
    const suffix: string = match[2].toUpperCase();

    const tier: number = suffixes.indexOf(suffix);
    if (tier === -1) {
        // Invalid suffix
        throw new Error(`Invalid suffix in likes string: ${likesString}`);
    }

    const scale: number = Math.pow(10, tier * 3);

    return num * scale;
}