let metronome =  {
  isActive: false,
  sound: audio,
  tempo: 100,
  minTempo: 20,
  maxTempo: 300,
  clickCount: 0,
  timer: null,
  getTempo() {
    return this.tempo
  },
  setTempo(newTempo) {
    this.tempo = newTempo
    console.log(this.tempo) 
  },
  getClickCount() {
    return this.clickCount
  },
  setClickCount(newClickCount) {
    this.clickCount = newClickCount
  },
  tick() {
    if ((trainer.break > 0) && (trainer.breakCounter < trainer.break) && (this.getClickCount() % trainer.period === 0) && (metronome.getClickCount() > 0) && (this.isActive == true)) {
      trainer.breakCounter++
      trainer.isOnBreak = true
      metronome.setClickCount(metronome.getClickCount() - 1)
      audio.volume = 0
      console.log('BREAK')
    } else {
      audio.volume = 1
      trainer.breakCounter = 0
      trainer.isOnBreak = false
    }

    audio.play()
    this.isActive = true
    let t1 = performance.now()
    this.setClickCount(this.getClickCount() + 1)
    view.update()

    if (trainer.break == 0) {
      if ((this.getClickCount() % trainer.period === 0) && (this.getTempo() < trainer.limit) && (trainer.breakCounter == 0)) {
        if (this.getTempo() + trainer.increment > trainer.limit) {
          this.setTempo(trainer.limit)
        } else {
          this.setTempo(this.getTempo() + trainer.increment)
        }
      }
    } else {
      if ((this.getClickCount() % trainer.period === 0) && (this.getTempo() < trainer.limit) && (trainer.breakCounter == trainer.break)) {
        if (this.getTempo() + trainer.increment > trainer.limit) {
          this.setTempo(trainer.limit)
        } else {
          this.setTempo(this.getTempo() + trainer.increment)
        }
      }
    }

    this.timer = setTimeout(() => {
      console.log(performance.now() - t1)
      this.tick()
    }, 60000 / this.getTempo())
  },
  stop() {
    clearInterval(this.timer)
    this.isActive = false
    this.setClickCount(0)
    trainer.breakCounter = 0
    view.update()
  }
}