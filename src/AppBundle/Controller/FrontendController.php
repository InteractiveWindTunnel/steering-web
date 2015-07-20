<?php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class FrontendController extends Controller
{
    /**
     * @Route("/")
     * @Method("GET")
     */
    public function demoAction()
    {
        return $this->render('Frontend\demo.html.twig');
    }

    /**
     * @Route("/about")
     * @Method("GET")
     */
    public function aboutAction()
    {
        return $this->render('Frontend\about.html.twig');
    }
}
