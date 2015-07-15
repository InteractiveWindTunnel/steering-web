<?php

namespace KrOs\WFIS\DriverBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class DriverController extends Controller
{
    /**
     * @Route("start", name="startFan")
     */
    public function startAction()
    {
        exec('echo "PWR=1">/dev/ttyS0');
        return new JsonResponse(['success'=>true]);
    }
    
    /**
    * @Route("stop", name="stopFan")
    */
    public function stopAction()
    {
        exec('echo "PWR=0">/dev/ttyS0');
        return new JsonResponse(['success'=>true]);
    }
}
