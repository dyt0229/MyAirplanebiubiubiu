function a(smz) {
    this.smz = smz;
}

let a1 = new a(100);
let b = a1.smz;
b--;
console.info(a1.smz);
console.info(b);