export default class NumberFormatter {
    private static formatter: Intl.NumberFormat;

    public static format(value: unknown): string
    {
        NumberFormatter.initialize();

        return NumberFormatter.formatter.format(value as number);
    }

    private static initialize()
    {
        if(this.formatter == undefined) {
            this.formatter = new Intl.NumberFormat('en-US');
        }
    }
}