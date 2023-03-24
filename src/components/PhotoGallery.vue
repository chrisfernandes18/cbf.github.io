<template>
  <div 
    id="photos"
    :ref="'photos' + photosId"
    >
    <img 
      v-for="(photo, index) in photos"
      :src="photo"
      @load="this.increaseLoadedImgs()"
      />
  </div>
</template>


<script>
export default {
  name: 'PhotoGallery',
  props: ['photos', 'photosId'],
  data() {
    return {
      scrollIntervalIds: [],
      width: 0,
      previousNum: -1,
      divChild: null,
      scrollValue: 0.5,
      intervalValue: 15,
      numImgs: 0,
    };
  },
  mounted() {
    this.divChild = this.$refs['photos' + this.photosId];
    const interval = setInterval(() => {
      if (this.divChild.childElementCount === this.numImgs) {
        clearInterval(interval);
        this.loadEvent();
        this.divChild.addEventListener('mouseenter', this.mouseenterEvent);
        this.divChild.addEventListener('mouseleave', this.mouseleaveEvent);
      }
    }, 50)
  },
  methods: {
    increaseLoadedImgs() {
      this.numImgs += 1;
    },
    /**
     * This function adds an interval for atlernating scrolling
     * of horizontal scrolling div tag of images. To be used 
     * with a window onload listener.
     */
    loadEvent() {
      // get cumulative width of all photos in div
      const divArr = [...this.divChild.children];
      let total = 0;
      divArr.forEach((child) => {
        total += child.clientWidth;
      });
      // set total to global data value
      this.width = total;

      // set every other div at the end of the photo length
      if (this.photosId % 2 == 1) {
        this.divChild.scrollLeft = this.width;
      } 

      // add intervals once everything has loaded
      this.mouseleaveEvent();
    },
    /**
     * This function removes an interval to pause the scrolling
     * on a horizontal scrolling div tag. To be used with a div
     * event listener for the mouseenter event.
     */
    mouseenterEvent() {
      window.clearInterval(this.scrollIntervalIds.pop());
    },
    /**
     * This function re-adds an interval to continue horizontal 
     * scrolling on a horizontal div tag of images. To be used 
     * with a div event listener for the mouseleave event.
     */
    mouseleaveEvent() {
      // add interval
      let num = self.setInterval(() => {
        const total = this.width;
        // depending on if the div is scrolling left or right we
        // add or subtract a value
        if (this.photosId % 2 == 0) {
          if (this.divChild.scrollLeft !== this.previousNum) {
            // keep track of when we stagnate increase value so we can reset
            this.previousNum = this.divChild.scrollLeft;
            // increase scroll value to continue to the end
            this.divChild.scrollTo(this.divChild.scrollLeft + this.scrollValue, 0);
          } else {
            // reset the value if we have scrolled all the way to the end
            this.divChild.scrollLeft = 0;
          }
        } else {
          if (this.divChild.scrollLeft > 0 ) {
            //console.log('scrolling', this.divChild.scrollLeft);
            // decrease scroll value to continue to the end
            this.divChild.scrollTo(this.divChild.scrollLeft - this.scrollValue, 0);
          } else {
            //console.log('reset', total);
            // reset the value if we have scrolled all the way to the end
            this.divChild.scrollLeft = total;
          }
        }
      }, this.intervalValue);
      this.scrollIntervalIds.push(num);
    }
  },
};
</script>