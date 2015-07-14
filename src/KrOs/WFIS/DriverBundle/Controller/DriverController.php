<?php

namespace KrOs\WFIS\DriverBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;

class DriverController extends Controller
{
    /**
     * @Route("start", name="startFan")
     * @Template()
     */
    public function startAction()
    {
        exec('echo "PWR=1">/dev/ttyS0');
        return new Response(json_encode(array('success'=>true)));
    }
    
    /**
    * @Route("stop", name="stopFan")
    * @Template()
    */
    public function stopAction()
    {
        exec('echo "PWR=0">/dev/ttyS0');
        return new Response(json_encode(array('success'=>true)));
    }
}
