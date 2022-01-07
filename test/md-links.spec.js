// import { describe } from "yargs";
import {mdLinks, validateLinks, findLinks } from "../index.js";


describe('mdLinks', () => {

  it('should be a function', () => {
    expect(typeof mdLinks).toBe("function");
  });
  it("should return a promise", () =>{
    const path = "prueba.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Promise);
  });
});

describe('validateLinks', () => {
  it('should be a function', () => {
    expect(typeof validateLinks).toBe("function");
  });
  it("should return a promise", () =>{
    const path = "prueba.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Promise);
  });
});

describe('findLinks', ()=>{
  it('should be a function', ()=>{
    expect(typeof findLinks).toBe("function");
  });
  it('should return object', () => {
    const path = "prueba.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Object);
  });
});
