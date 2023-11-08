export interface TreeElement {
    checked: boolean;
    name: string | undefined | null;
    children: TreeElement [];
}