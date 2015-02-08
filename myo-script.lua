scriptId = 'com.thalmic.examples.outputeverything'
scriptTitle = "Output Everything"
scriptDetailsUrl = "" -- We don't have this until it's submitted to the Myo Market

centreRoll = 0
mouseClicked = false
mouseControl = false
function onPoseEdge(pose, edge)
    myo.debug("onPoseEdge: " .. pose .. ", " .. edge)

    if (edge == "on") then
        if (pose == "fist") then
            leftClick()
        elseif (pose == "fingersSpread") then
            --stopMouseControl()
        elseif (pose == "doubleTap") then
            --myo.vibrate("short")
            --startMouseControl()
        elseif (pose == "waveIn") then
            centreRoll = myo.getRoll()

        end


    end

end

function startMouseControl()
    --myo.controlMouse(true);
end

function leftClick()
    --myo.vibrate("short")
    --myo.debug("click")
    --myo.mouse("left", "click")
    --if (mouseClicked) then
    --  myo.mouse("left", "up")
    --  mouseClicked = false
    --else
    --  myo.mouse("left", "down")
    --  mouseClicked = true
    --end
    myo.keyboard("x","press")
end

function stopMouseControl()
    --myo.controlMouse(false);
end

function onPeriodic()
    local currentYaw = myo.getYaw()
    local currentRoll = myo.getRoll()
    local currentPitch = myo.getPitch()
    --myo.debug("current yaw: " .. currentYaw)
    --myo.debug("past roll: " .. centreRoll)
    --myo.debug("current roll: " .. currentRoll)
    --myo.debug("current pitch: " .. currentPitch)
    if (centreRoll - currentRoll > 1) then
        --myo.vibrate("short")
        myo.debug("zoom in")
        myo.keyboard("equal", "press", "shift")
        centreRoll = 0
    elseif (currentRoll - centreRoll > .5) then
        --myo.vibrate("short")
        myo.debug("zoom out")
        myo.keyboard("minus", "press")
        centreRoll = 0
    end


end

function onForegroundWindowChange(app, title)
    --myo.debug("onForegroundWindowChange: " .. app .. ", " .. title)
    --myo.controlMouse(true);
    myo.setLockingPolicy("none")
    return true
end

function activeAppName()
    return "Output Everything"
end

function onActiveChange(isActive)
    myo.debug("onActiveChange")
end