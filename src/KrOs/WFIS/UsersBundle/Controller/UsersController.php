<?php

namespace KrOs\WFIS\UsersBundle\Controller;

use JMS\SecurityExtraBundle\Annotation\Secure;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use KrOs\WFIS\UsersBundle\Form\UserType;
use KrOs\WFIS\UsersBundle\Entity\User;

class UsersController extends Controller
{
    /**
     * @Secure(roles="ROLE_ADMIN")
     * @Route("/", name="users_list")
     * @Template()
     */
    public function indexAction()
    {
        $users = $this->getDoctrine()->getEntityManager()->getRepository('UsersBundle:User')->findBy(array(), array('id'=>'ASC'));
        return $this->render("UsersBundle::list.html.twig", array('users'=>$users));
    }
    
    /**
     * @Secure(roles="ROLE_ADMIN")
     * @Route("/edit/{nickname}", name="user_edit")
     *
     */
    public function editUserAction($nickname)
    {
        $user = $this->getDoctrine()->getEntityManager()->getRepository('UsersBundle:User')->findOneBy(array('username'=>$nickname), array('id'=>'ASC'));
        $form = $this->createForm(new UserType(), $user);
        
        return $this->render("UsersBundle::userForm.html.twig", array('form'=>$form->createView()));
    }
    
    /**
     * @Secure(roles="ROLE_ADMIN")
     * @Route("/add", name="user_add")
     *
     */
    public function addUserAction()
    {
        $user = new User();
        $form = $this->createForm(new UserType(), $user);
        
        return $this->render("UsersBundle::userForm.html.twig", array('form'=>$form->createView()));
    }
    
    /**
     * @Secure(roles="ROLE_ADMIN")
     * @Route("/submit", name="user_form_submit")
     *
     */
    public function submitUserFormAction(Request $request)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $form = $request->get('user');
        $nickname = $form['username'];
        $user = $this->getDoctrine()->getEntityManager()->getRepository('UsersBundle:User')->findOneBy(array('username'=>$nickname), array('id'=>'ASC'));
        if (!is_object($user)) {
            $user = new User();
        }
        $form = $this->createForm(new UserType(), $user);
        $form->bindRequest($request);
        if ($form->isValid()) {
            $userManager = $this->get('fos_user.user_manager')->updateUser($user);
            return $this->redirect($this->generateUrl('users_list'));
        } else {
            return $this->render("UsersBundle::userForm.html.twig", array('form'=>$form->createView()));
        }
    }
    
    /**
     * @Secure(roles="ROLE_ADMIN")
     * @Route("/delete", name="user_delete")
     *
     */
    public function removeUserAction(Request $request)
    {
        $id = $request->get('id');
        $em = $this->getDoctrine()->getEntityManager();
        $users = $em->getRepository('UsersBundle:User')->findBy(array('id'=>$id));
        foreach ($users as $user) {
            $em->remove($user);
        }
        $em->flush();
        return new Response(json_encode(array('success'=>true)));
    }
}
