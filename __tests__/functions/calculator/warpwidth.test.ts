import { testReed } from '@/__tests__/test_data/reedTestData'
import { testWarpWidthData } from '@/__tests__/test_data/warpTestData'
import { calculateWarpEpc, calculateWarpWidth } from '@/app/resources/functions/calculator/warpwidth'

describe('Basic calculations on warp width return expected result', () => {

   //Tests of calculations starting from warp
   it('Width from ends', () => {
      const { warp, reed } = calculateWarpWidth('ends', 600, testWarpWidthData, testReed)

      //warp comparisons
      expect(warp.width).toBe(120)
      expect(warp.ends).toBe(600)
      expect(warp.epc).toBe(testWarpWidthData.epc)

      //reed comparisons
      expect(reed).toStrictEqual(testReed)
   })

   it('With from epc', () => {
      const { warp, reed } = calculateWarpWidth('epc', 10, testWarpWidthData, testReed)

      //warp comparisons
      expect(warp.width).toBe(50)
      expect(warp.epc).toBe(10)
      expect(warp.ends).toBe(testWarpWidthData.ends)

      //reed comparisons
      expect(reed).toStrictEqual(testReed)
   })

   it('Ends from from width', () => {
      const { warp, reed } = calculateWarpWidth('width', 75, testWarpWidthData, testReed)

      //warp comparisons
      expect(warp.width).toBe(75)
      expect(warp.epc).toBe(testWarpWidthData.epc)
      expect(warp.ends).toBe(375)

      //reed comparisons
      expect(reed).toStrictEqual(testReed)
   })

   it('Ends from from width', () => {
      const { warp, reed } = calculateWarpWidth('width', 0, testWarpWidthData, testReed)

      //warp comparisons
      expect(warp.width).toBe(0)
      expect(warp.epc).toBe(testWarpWidthData.epc)
      expect(warp.ends).toBe(0)

      //reed comparisons
      expect(reed).toStrictEqual(testReed)
   })

   //Tests of calculations starting from reed
   it('Width from dents', () => {
      const { warp, reed } = calculateWarpWidth('dents', 30, testWarpWidthData, testReed)

      //warp comparisons
      expect(warp.epc).toBe(3)
      expect(warp.width).toEqual(166.67)
      expect(warp.ends).toBe(testWarpWidthData.ends)

      //reed comparisons
      expect(reed.dents).toBe(30)
      expect(reed.section).toBe(testReed.section)
      expect(reed.tph).toBe(testReed.tph)
      expect(reed.tpd).toBe(testReed.tpd)
   })

   it('Width from section', () => {
      const { warp, reed } = calculateWarpWidth('section', 5, testWarpWidthData, testReed)

      //warp comparisons
      expect(warp.epc).toBe(10)
      expect(warp.width).toBe(50)
      expect(warp.ends).toBe(testWarpWidthData.ends)

      //reed comparisons
      expect(reed.section).toBe(5)
      expect(reed.dents).toBe(testReed.dents)
      expect(reed.tph).toBe(testReed.tph)
      expect(reed.tpd).toBe(testReed.tpd)
   })

   it('Width from tpd', () => {
      const { warp, reed } = calculateWarpWidth('tpd', 2, testWarpWidthData, testReed)

      //warp comparisons
      expect(warp.epc).toBe(10)
      expect(warp.width).toBe(50)
      expect(warp.ends).toBe(testWarpWidthData.ends)

      //reed comparisons
      expect(reed.section).toBe(testReed.section)
      expect(reed.dents).toBe(testReed.dents)
      expect(reed.tph).toBe(testReed.tph)
      expect(reed.tpd).toBe(2)
   })



})

describe('Basic calculation on epc returns expected result', () => {

   it('Epc from ends and with', () => {
      const epc = calculateWarpEpc(1000, 100)
      expect(epc).toBe(10)
   })

   it('Epc from ends and with', () => {
      const epc = calculateWarpEpc(0, 100)
      expect(epc).toBe(0)
   })
})
